import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./app/services/database";
import bcrypt from "bcryptjs";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export default {
  providers: [
    Google,
    Github,
    Credentials({
      authorize: async (credentials) => {
        console.log("provider", credentials);
        // console.log({ credentials });
        // if (credentials.email !== "test@gmail.com") {
        //   throw new Error("invalid credentials");
        // }

        // return {
        //   id: "1",
        //   name: "Test User",
        //   email: "test@gmail.com",
        // };

        if (!credentials.email || !credentials.password) {
          console.log("inval cred", credentials);

          throw new Error("invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user.password) {
          console.log("inval !user", credentials);

          throw new Error("invalid credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          console.log("isInvalid", credentials);

          throw new Error("incorrect password");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
