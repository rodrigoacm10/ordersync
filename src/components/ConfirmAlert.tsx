"use client";

import { Button } from "./ui/button";

interface ConfirmAlertProps {
  title: string;
  subtitle: string;
  visible: boolean;
  cancel: (visible: boolean) => void;
  toDo: () => void;
  type: "cancel" | "concluded";
  sub?: string;
}

export function ConfirmAlert({
  title,
  subtitle,
  cancel,
  toDo,
  visible,
  type,
  sub,
}: ConfirmAlertProps) {
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed  h-screen w-full top-0 left-0   opacity-2 z-40"
    >
      <div className="z-50 fixed pt-4 px-1 pb-2 rounded-[5px] opacity-100 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[220px] ">
        <h2 className="font-bold text-center text-[20px] ">{title}</h2>
        <h2 className="font-bold text-center text-[20px]">{subtitle}</h2>
        {sub ? (
          <p className="text-[#828282] mt-2 text-center text-[10px] small:text-[12px] ">
            {sub}
          </p>
        ) : (
          ""
        )}

        <div className="w-full flex gap-1 mt-8">
          <Button
            onClick={() => cancel(!visible)}
            variant="outline"
            className="w-full"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => toDo()}
            className={`w-full ${
              type == "cancel" ? "bg-[#A50303] hover:bg-[#D00000]" : ""
            }  `}
          >
            {type == "cancel" ? "Excluir" : "Confirmar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
