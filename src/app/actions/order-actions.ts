"use server";

import { prisma } from "../services/database";

interface OrderItemsProps {
  productId: string;
  productName: string;
  quantity: number;
  value: number;
  // orderId: string;
  // id: string;
}

interface CreateOrderProps {
  value: number;
  client: string;
  description: string;
  date: string;
  timeStart: number;
  timeConcluded: number;
  userId: string;
  orderItems: OrderItemsProps[];
  clientRegis: boolean;
}

export const listOrderController = async ({
  id,
  date,
}: {
  id: string;
  date: string;
}) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: id,
      date: date,
    },
    include: {
      orderItems: true,
    },
  });

  return orders;
};

export const createOrderController = async ({
  value,
  client,
  description,
  date,
  timeStart,
  timeConcluded,
  userId,
  orderItems,
  clientRegis,
}: CreateOrderProps) => {
  const order = await prisma.order.create({
    data: {
      value: value, // Total value of the order
      client: client,
      description: description,
      //   date: "2024-08-01",
      date: date,
      timeStart: timeStart,
      timeConcluded: timeConcluded, // 1 hour later
      userId: userId,
      clientRegis: clientRegis,
      orderItems: {
        create: [...orderItems],
      },
    },
    include: {
      orderItems: true,
    },
  });

  //   .create({
  //     data: {
  //       value: 49.98, // Total value of the order
  //       client: "John Doe",
  //       description: "Order with multiple items",
  //       date: "2024-08-01",
  //       timeStart: BigInt(Date.now()),
  //       timeConcluded: BigInt(Date.now() + 3600000), // 1 hour later
  //       userId: user.id,
  //       orderItems: {
  //         create: [
  //           {
  //             productId: product1.id,
  //             productName: product1.name,
  //             quantity: 1,
  //             value: product1.price,
  //           },
  //           {
  //             productId: product2.id,
  //             productName: product2.name,
  //             quantity: 1,
  //             value: product2.price,
  //           },
  //         ],
  //       },
  //     },
  //     include: {
  //       orderItems: true,
  //     },
  //   });
  return order;
};

export const concludedOrderController = async ({ id }: { id: string }) => {
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { concluded: true, timeConcluded: new Date().getTime() },
  });
  return updatedOrder;
};

export const deleteOrderController = async ({ id }: { id: string }) => {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.orderProduct.deleteMany({
        where: {
          orderId: id,
        },
      });

      await prisma.order.delete({
        where: {
          id: id,
        },
      });
    });

    console.log(`Order with ID ${id} and its orderItems have been deleted.`);
  } catch (error) {
    console.error("Error deleting order and orderItems:", error);
  }
};
