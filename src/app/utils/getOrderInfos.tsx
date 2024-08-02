import { OrderContainerProps, OrderProps } from "@/components/OrderContainer";

export const getOrderInfos = (data: OrderContainerProps[]) => {
  const totalArr: OrderProps[] = [];

  // const getInfosArr =
  data.map((e) => {
    e.order.map((e) => {
      const objEl = totalArr.find((el) => el.product == e.product);
      const indexEl = totalArr.findIndex((el) => el.product == e.product);

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

  const pendingArr: OrderProps[] = [];

  data
    .filter((e) => e.concluded == false)
    .map((e) => {
      e.order.map((e) => {
        const objEl = pendingArr.find((el) => el.product == e.product);
        const indexEl = pendingArr.findIndex((el) => el.product == e.product);

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

  const accomplishedArr: OrderProps[] = [];

  data
    .filter((e) => e.concluded == true)
    .map((e) => {
      e.order.map((e) => {
        const objEl = accomplishedArr.find((el) => el.product == e.product);
        const indexEl = accomplishedArr.findIndex(
          (el) => el.product == e.product
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
