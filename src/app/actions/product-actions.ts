"use server";

import { prisma } from "../services/database";

interface CreateProductProps {
  name: string;
  price: number;
  details: string;
  userId: string;
  quantity: number;
  control: boolean;
}

interface EditProps extends CreateProductProps {
  id: string;
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

export const GetProductController = async ({ id }: { id: string }) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        id: id,
      },
    });
    return products;
  } catch (error) {
    return error;
  }
};

export const DeleteProductController = async ({ id }: { id: string }) => {
  try {
    const deletedProducts = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return deletedProducts;
  } catch (error) {
    return error;
  }
};

export const createProductController = async ({
  name,
  price,
  details,
  userId,
  quantity,
  control,
}: CreateProductProps) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        details,
        userId,
        quantity,
        control,
      },
    });
    return newProduct;
  } catch (error) {
    return error;
  }
};

export const EditProductController = async ({
  id,
  name,
  price,
  details,
  userId,
  quantity,
  control,
}: EditProps) => {
  try {
    const editedProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        price,
        details,
        userId,
        quantity,
        control,
      },
    });
    return editedProduct;
  } catch (error) {
    return error;
  }
};
export const EditProductQuantityController = async ({
  id,

  quantity,
}: {
  id: string;
  quantity: number;
}) => {
  try {
    const editedProductQuantity = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        quantity,
      },
    });
    return editedProductQuantity;
  } catch (error) {
    return error;
  }
};
