"use client";

import { IoMdMore } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { useContext, useState } from "react";
import { SetContext } from "@/contexts/setContext";
import { formatMilliseconds, getTimeFormat } from "@/app/utils/getTimeFormat";

export interface OrderTestProps {
  quantity: number;
  product: string;
  value: number;
}

export interface OrderContainerProps {
  value: number;
  client: string;
  description: string;
  order: OrderTestProps[];
  concluded: boolean;
  timeStart: number;
  timeConcluded: number;

  id: string;
}

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
  timeStart: bigint | number;
  timeConcluded: bigint | number | null;
  userId: string;
}

// colocar os novos tipos para funcionar

// interface OrderItemProps {
//   id: string;
//   quantity: number;
//   productId: string;
//   productName: string;
//   orderId: string;
//   value: number;
// }

// interface OrderProps {
//   client: string;
//   concluded: boolean;
//   date: string;
//   description: string | null;
//   orderItems: OrderItemProps[];

//   id: string;
//   value: number;
//   timeStart: bigint;
//   timeConcluded: bigint | null;
//   userId: string;
// }

export function OrderContainer({
  client,
  description,
  orderItems,
  value,
  concluded,
  timeStart,
  timeConcluded,
  id,
}: Omit<OrderProps, "date" | "userId">) {
  // const order = orderItems.map((order) => ({
  //   ...order,
  //   timeStart: Number(order.timeStart), // Convertendo BigInt para number
  // timeConcluded: order.timeConcluded
  //   ? Number(order.timeConcluded)
  //   : 0, // Convertendo BigInt para number
  // }));

  timeStart = Number(timeStart);
  timeConcluded = timeConcluded ? Number(timeConcluded) : 0;

  const [openOptions, setOpenOptions] = useState(false);
  // const [timeWaiting, setTimeWaiting] = useState(
  //   new Date().getTime() - timeStart
  // );

  // const timeNumber = () => {
  //   let time = new Date().getTime() - timeStart;

  //   const addTime = () => {
  //     // time += 1000;
  //     setTimeWaiting(timeWaiting + 1000);
  //     console.log(time);
  //     // console.log(timeWaiting);
  //   };

  //   if (!concluded) {
  //     setInterval(addTime, 1000);
  //   }
  //   return time;
  // };

  // const addTime = () => {
  //   // time += 1000;
  //   setTimeWaiting(timeWaiting + 1000);
  //   // console.log(time);
  //   // console.log(timeWaiting);
  // };

  if (!concluded) {
    // setInterval(addTime, 1000);
  }

  const {
    cancelVisible,
    setCancelVisible,
    concludedConfirm,
    setConcludedConfirm,
    setIdConcluded,
  } = useContext(SetContext);

  // console.log(timeConcluded);

  // if (!timeConcluded) {
  //   timeConcluded = 0;
  // }

  console.log(
    timeStart

    // getTimeFormat(timeConcluded, "all")
  );

  console.log("all->", getTimeFormat(timeStart, "all"));
  console.log("date->", getTimeFormat(timeStart, "date"));
  console.log("hours->", getTimeFormat(timeStart, "hours"));

  return (
    <div
      className={`${concluded ? "bg-[#E2E2E2]" : ""} ${
        concluded ? "border-[#CCCCCC]" : "border-[#DCDCDC]"
      } mr-2 px-[30px] relative py-[25px] border   border-[0.5px] rounded-[5px]`}
    >
      <div className="flex items-center justify-between">
        <div className="text-[16px]  medium:text-[20px]  font-semibold flex items-center gap-2">
          <h3 className="flex-shrink-0">
            R$ {value},00
            {/* R$ {orderItems.reduce((acc, e) => (acc += e.value), 0)},00 */}
          </h3>
          <span>-</span>
          <h3>{client}</h3>
        </div>
        <div
          className="flex items-center gap-2
        "
        >
          <Checkbox
            checked={concluded}
            onClick={() => {
              setIdConcluded(id);
              setConcludedConfirm(!concludedConfirm);
            }}
            disabled={concluded}
          />
          <button
            disabled={concluded}
            onClick={() => {
              setIdConcluded(id);
              setOpenOptions(!openOptions);
            }}
            className="pointer"
          >
            <IoMdMore size={26} />
          </button>
        </div>
      </div>

      <div className="text-[16px]  medium:text-[18px]  text-[#828282] mt-[20px]    max-w-[1000px]   w-full  ">
        {orderItems.map((e, i) => {
          return (
            <span key={i} className={`${i > 0 ? "pl-1" : ""}  `}>
              {e.quantity}x {e.productName}{" "}
              {i < orderItems.length - 1 ? "-" : ""}
            </span>
          );
        })}
      </div>
      <p className="text-[#828282] text-[14px]  medium:text-[16px] mt-[16px] mb-2">
        {!!description ? description : "nenhuma descrição"}
      </p>

      <div className="  absolute right-8 bottom-2 self-end flex items-center gap-3">
        <p className="flex text-[14px] gap-1 text-[#828282]">
          feito: <span>{getTimeFormat(timeStart, "hours")}</span>
        </p>
        <p className="flex text-[14px] gap-1 text-[#828282]">
          espera:{" "}
          <span>
            {concluded
              ? formatMilliseconds(timeConcluded - timeStart)
              : formatMilliseconds(1000)}
          </span>
        </p>
      </div>

      {openOptions ? (
        <div
          className="flex flex-col   bg-white absolute border-[#DCDCDC]
 border   border-[0.5px] rounded-[5px] top-14 right-10  "
        >
          <button
            onClick={() => {
              setOpenOptions(!openOptions);
              setCancelVisible(!cancelVisible);
            }}
            className="text-[red] p-2 px-4"
          >
            excluir
          </button>
          <button className="p-2 px-4">editar</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
