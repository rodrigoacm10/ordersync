import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // providers: [],
  ...authConfig,
  session: { strategy: "jwt" },
});

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "hello@example.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         const user = { id: "1", name: "Ethand", email: "test@gmail.com" };
//         return user;
//       },
//     }),
//   ],

// providers: [
//   EmailProvider({
//     server: process.env.EMAIL_SERVER,
//     from: process.env.EMAIL_FROM,
//   }),
// ],
// providers: [github],
// });
