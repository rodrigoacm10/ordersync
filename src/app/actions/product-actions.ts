"use server";

import { prisma } from "../services/database";

interface CreateProductProps {
  name: string;
  price: number;
  details: string;
  userId: string;
}

export const ListProductController = async ({ id }: { id: string }) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: id,
      },
    });
    return products;
  } catch (error) {
    return error;
  }
};

export const createProductController = async ({
  name,
  price,
  details,
  userId,
}: CreateProductProps) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        details,
        userId,
      },
    });
    return newProduct;
  } catch (error) {
    return error;
  }
};
