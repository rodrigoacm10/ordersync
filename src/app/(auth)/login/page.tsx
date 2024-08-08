"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { loginAction } from "@/app/actions/auth-action";
import { useState, useTransition } from "react";
// import { signIn } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Login() {
  const router = useRouter();

  const checkoutLoginSchema = yupResolver(
    yup.object({
      email: yup.string().required("inserir campo"),
      password: yup.string().required("inserir campo"),
    })
  );

  const formMethods = useForm({
    // defaultValues: {
    //   costValue: "0",
    //   profitMargin: "0",
    //   saleValue: "0",
    // },
    resolver: checkoutLoginSchema,
  });

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = formMethods;

  const handleLogin = async (values: any) => {
    console.log(values);

    // await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // });
    setError(null);
    startTransition(async () => {
      const response = await loginAction(values);
      console.log(response); // setTab
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/home");
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center w-full ">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="px-[20px] py-[30px] border border-[#DCDCDC] border-[1px] rounded-[5px] "
      >
        <h1 className="font-bold text-center text-2xl mb-[20px]">Login</h1>

        <div>
          <label className="text-[12px] font-bold">E-mail</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="exemplo@gmail.com"
          />
        </div>

        <div>
          <label className="text-[12px] font-bold">senha</label>
          <Input
            {...register("password")}
            type="password"
            placeholder="insira sua senha"
          />
        </div>

        <div className="h-[1px] w-full bg-[#DCDCDC] mt-2 mb-2"></div>

        <Button disabled={isPending} type="submit" className="w-full">
          Entrar
        </Button>
        <div className="grid grid-cols-2 gap-1 mt-1">
          <Button
            onClick={async (e) => {
              e.preventDefault();
              await signIn("google");
            }}
            variant="outline"
            className="flex items-center gap-1"
          >
            {" "}
            <FaGoogle />
            Google
          </Button>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              await signIn("github");
            }}
            variant="outline"
            className="flex items-center gap-1"
          >
            <FaGithub />
            Github
          </Button>
        </div>
        {/* <Link className="text-[12px] underline" href="/">
          esqueci a senha
        </Link> */}

        <div className="mt-8 text-[14px] underline flex justify-between">
          <Link href="/">voltar</Link>
          <Link href="/register">criar conta</Link>
        </div>
      </form>
    </main>
  );
}
