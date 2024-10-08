import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { SetContext } from "@/contexts/setContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ListProductController } from "@/app/actions/product-actions";
import { createGroup } from "@/app/actions/group-actions";
import { useToast } from "./ui/use-toast";

export function CreateGroup() {
  const { toast } = useToast();

  const {
    userIdContext,

    addProductList,
    setAddProductList,
    createGroupVisible,
    setCreateGroupVisible,
  } = useContext(SetContext);

  const checkoutAddProductSchema = yupResolver(
    yup.object({
      group: yup.string().required("inserir campo"),
    })
  );

  const formMethods = useForm({
    // defaultValues: {
    //   costValue: "0",
    //   profitMargin: "0",
    //   saleValue: "0",
    // },
    resolver: checkoutAddProductSchema,
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = formMethods;

  // colocar os tipos
  const handleACreateGroupSubmit = async (values: any) => {
    console.log(values);
    const newGroup = await createGroup({
      name: values.group,
      userId: userIdContext,
    });

    if (newGroup) {
      toast({
        variant: "confirmed",
        title: "Grupo criado ",
      });
    }

    console.log(newGroup);

    setCreateGroupVisible(!createGroupVisible);
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed  h-screen w-full top-0 left-0   opacity-2 z-50"
    >
      <form
        onSubmit={handleSubmit(handleACreateGroupSubmit)}
        className="z-60    px-7 fixed pt-6 px-1 pb-2 rounded-[5px] opacity-100 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2   "
      >
        <h2 className="font-bold text-[20px]">Criar grupo</h2>
        <div className="flex items-center gap-2 mt-2">
          <Input
            {...register("group")}
            type="string"
            placeholder="Ex: Area 2"
          />
        </div>
        <div className="  mt-4  flex gap-1 justify-end ">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setCreateGroupVisible(!createGroupVisible);
            }}
            variant="outline"
          >
            Cancelar
          </Button>

          <Button type="submit">Criar</Button>
        </div>
      </form>
    </div>
  );
}
