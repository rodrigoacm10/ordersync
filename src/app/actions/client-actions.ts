"use server";

// import { PrismaClient } from "@prisma/client";

import { prisma } from "../services/database";

// const prisma = new PrismaClient();

interface CreateCLientProps {
  //   id: string;
  name: string;
  price: number;
  details: string;
  group: string;
  userId: string;
}

export const createClient = async ({
  //   id,
  name,
  price,
  details,
  userId,
  group,
}: CreateCLientProps) => {
  const newClient = await prisma.client.create({
    data: {
      name: name,
      price: price,
      details: details,
      userId: userId,
      group: group,
    },
  });

  console.log(newClient);

  return newClient;
};

export const listClients = async ({ id }: { id: string }) => {
  const clients = await prisma.client.findMany({
    where: {
      userId: id,
    },
  });

  // console.log(clients);

  return clients;
};

export const deleteClient = async ({ id }: { id: string }) => {
  const deleteClient = await prisma.client.delete({
    where: {
      id: id,
    },
  });

  return deleteClient;
};

export const editPrice = async ({
  id,
  price,
}: {
  id: string;
  price: number;
}) => {
  const updateClient = await prisma.client.update({
    where: {
      id: id,
    },
    data: {
      price: price,
    },
  });

  return updateClient;
};

export const editClient = async ({
  id,
  price,
  name,
  details,
  group,
}: {
  id: string;
  price: number;
  name: string;
  details: string;
  group: string;
}) => {
  const updateClient = await prisma.client.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      price: price,
      details: details,
      group: group,
    },
  });

  return updateClient;
};
