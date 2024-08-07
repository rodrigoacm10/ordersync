// import { OrderContainerProps, OrderProps } from "@/components/OrderContainer";

interface OrderItemProps {
  id: string;
  quantity: number;
  productId: string;
  productName: string;
  orderId: string;
  value: number;
}

interface OrderProps {
  client: string;
  concluded: boolean;
  date: string;
  description: string | null;
  orderItems: OrderItemProps[];

  id: string;
  value: number;
  timeStart: bigint;
  timeConcluded: bigint | null;
  userId: string;
}

export const getOrderInfos = (data: OrderProps[]) => {
  console.log(data);
  const totalArr: OrderItemProps[] = [];

  // const getInfosArr =
  data.map((e) => {
    e.orderItems.map((e) => {
      const objEl = totalArr.find((el) => el.productId == e.productId);
      const indexEl = totalArr.findIndex((el) => el.productId == e.productId);

      if (!!objEl) {
        // console.log(totalArr[indexEl].value);
        // console.log(totalArr[indexEl].quantity);

        totalArr[indexEl].value += e.value;
        totalArr[indexEl].quantity += e.quantity;

        console.log("já tem");
      } else {
        totalArr.push(JSON.parse(JSON.stringify(e)));
      }
      // console.log(e);
      // console.log("totalArr", totalArr);
    });
  });

  const pendingArr: OrderItemProps[] = [];

  data
    .filter((e) => e.concluded == false)
    .map((e) => {
      e.orderItems.map((e) => {
        const objEl = pendingArr.find((el) => el.productId == e.productId);
        const indexEl = pendingArr.findIndex(
          (el) => el.productId == e.productId
        );

        if (!!objEl) {
          // console.log(pendingArr[indexEl].value);
          // console.log(pendingArr[indexEl].quantity);
          //
          pendingArr[indexEl].value += e.value;
          pendingArr[indexEl].quantity += e.quantity;

          // console.log("já tem");
        } else {
          pendingArr.push(JSON.parse(JSON.stringify(e)));
        }
        // console.log(e);
        // console.log("pendingArr", pendingArr);
      });
    });

  const accomplishedArr: OrderItemProps[] = [];

  data
    .filter((e) => e.concluded == true)
    .map((e) => {
      e.orderItems.map((e) => {
        const objEl = accomplishedArr.find((el) => el.productId == e.productId);
        const indexEl = accomplishedArr.findIndex(
          (el) => el.productId == e.productId
        );

        if (!!objEl) {
          // console.log(accomplishedArr[indexEl].value);
          // console.log(accomplishedArr[indexEl].quantity);

          accomplishedArr[indexEl].value += e.value;
          accomplishedArr[indexEl].quantity += e.quantity;

          // console.log("já tem");
        } else {
          accomplishedArr.push(JSON.parse(JSON.stringify(e)));
        }
        // console.log(e);
        // console.log("accomplishedArr", accomplishedArr);
      });
    });

  return { totalArr, pendingArr, accomplishedArr };
};
