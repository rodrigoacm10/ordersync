"use server";

// import { signIn } from "next-auth/react";
import { auth, signIn } from "../services/auth";
import { AuthError } from "next-auth";
import { prisma } from "../services/database";
import bcrypt from "bcryptjs";

export const loginAction = async (values: any) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { sucess: true };
  } catch (err) {
    console.log(err);
    console.log("loginAction", values);
    if (err instanceof AuthError) {
      return { error: err.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export const registerAction = async (values: any) => {
  try {
    //   await signIn("credentials", {
    //     email: values.email,
    //     password: values.password,
    //     redirect: false,
    //   });
    const user = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    // console.log(user);

    if (user?.email) {
      return {
        error: "user already exists",
      };
    }

    const passwordHash = await bcrypt.hash(values.password, 10);

    await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: passwordHash,
      },
    });

    // await loginAction(values);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return { sucess: true };
  } catch (err) {
    console.log(err);
    if (err instanceof AuthError) {
      return { error: err.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export const getSession = async () => {
  const session = await auth();

  console.log(session);

  return session;
};
