"use server";

import { prisma } from "../services/database";

export const getUserController = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};
