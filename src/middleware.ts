// export { auth as middleware } from "@/app/services/auth";

import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);
