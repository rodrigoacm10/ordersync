"use server";

import { prisma } from "../services/database";

export const listGroups = async ({ id }: { id: string }) => {
  const groups = await prisma.group.findMany({
    where: {
      userId: id,
    },
  });

  // console.log(groups);

  return groups;
};

export const createGroup = async ({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) => {
  const newGroup = await prisma.group.create({
    data: {
      name: name,
      userId: userId,
    },
  });

  // console.log(newGroup);

  return newGroup;
};
