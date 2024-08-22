"use client";

import { useContext, useEffect, useState, useTransition } from "react";
import { Title } from "./Title";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SetContext } from "@/contexts/setContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createProductController,
  EditProductController,
} from "@/app/actions/product-actions";
import { useToast } from "./ui/use-toast";
import { Checkbox } from "./ui/checkbox";
import { onlyNumbers, priceMask, priceValueMask } from "@/app/utils/masks";

type ErrorResponse = {
  error: string;
};

export function CreateProduct({
  edit,
  id,
  name,
  price,
  quantity,
  details,
  control,
}: {
  edit: boolean;
  id?: string;
  name?: string;
  quantity?: number;
  details?: string;
  price?: number;
  control?: boolean;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  // control ? true : false
  const [error, setError] = useState<string | null>(null);
  const [check, setCheck] = useState(control ? true : false);

  const {
    userIdContext,
    createProductVisible,
    setCreateProductVisible,
    attData,
    setAttData,
  } = useContext(SetContext);

  const checkoutCreateProductSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      price: yup.string().required("inserir campo"),
      details: yup.string(),
      quantity: yup.string(),
    })
  );

  const checkoutCreateControlProductSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      price: yup.string().required("inserir campo"),
      details: yup.string(),
      quantity: yup.string().required("inserir campo"),
    })
  );

  const changeSchema = () => {
    if (check) {
      return checkoutCreateControlProductSchema;
    } else {
      return checkoutCreateProductSchema;
    }
  };

  const formMethods = useForm({
    defaultValues: {
      name: name ? name : "",
      price: price ? priceMask(`${price.toFixed(2)}`) : "0",
      quantity: quantity ? `${quantity}` : "0",
      details: details ? details : "",
      //   costValue: "0",
      //   profitMargin: "0",
      //   saleValue: "0",
    },
    // resolver: checkoutCreateProductSchema,
    resolver: changeSchema() as any,
  });

  const {
    reset,
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = formMethods;

  const quantityValue = watch("quantity");
  const priceValue = watch("price");

  useEffect(() => {
    setValue("quantity", onlyNumbers(quantityValue ? quantityValue : ""));
    // setValue("price", priceValueMask(priceValue));
    setValue("price", priceMask(priceValue));
  }, [quantityValue, priceValue]);

  // Type Guard para verificar se o objeto é do tipo ErrorResponse
  function isErrorResponse(obj: any): obj is ErrorResponse {
    return "error" in obj;
  }

  // colocar os tipos
  const handleCreateProductSubmit = async (values: any) => {
    setError(null);
    if (edit) {
      startTransition(async () => {
        console.log("funcionou");
        console.log(values);
        console.log(+values.price.split(" ")[1].replace(",", "."));
        console.log(values.quantity);
        if (
          +values.price
            .split(" ")[1]
            .replaceAll(".", "")
            .replaceAll(",", ".") <= 0
        ) {
          setError("*preço inválido");
          return;
        }
        const newProduct = await EditProductController({
          id: id as string,
          name: values.name,
          price: +values.price
            .split(" ")[1]
            .replaceAll(".", "")
            .replaceAll(",", "."),
          // price: +values.price,
          details: values.details,
          userId: userIdContext,
          quantity: +values.quantity && check ? +values.quantity : 0,
          control: check,
        });
        if (
          isErrorResponse(newProduct) &&
          newProduct?.error?.includes("name")
        ) {
          setError("*nome já existente");
          return;
        }
        console.log(newProduct);
        setCreateProductVisible(!createProductVisible);
        reset();
        toast({
          variant: "confirmed",
          title: "Produto criado ",
        });
      });
    } else {
      startTransition(async () => {
        console.log("funcionou");
        console.log(values);
        console.log(values);
        console.log(
          +values.price.split(" ")[1].replaceAll(".", "").replaceAll(",", ".")
        );

        console.log(values.quantity);
        if (
          +values.price
            .split(" ")[1]
            .replaceAll(".", "")
            .replaceAll(",", ".") <= 0
        ) {
          setError("*preço inválido");
          return;
        }
        const newProduct = await createProductController({
          name: values.name,
          // price: +values.price,
          price: +values.price
            .split(" ")[1]
            .replaceAll(".", "")
            .replaceAll(",", "."),
          details: values.details,
          userId: userIdContext,
          quantity: +values.quantity ? +values.quantity : 0,
          control: check,
        });
        if (
          isErrorResponse(newProduct) &&
          newProduct?.error?.includes("name")
        ) {
          setError("*nome já existente");
          return;
        }
        console.log(newProduct);
        setCreateProductVisible(!createProductVisible);
        reset();
        toast({
          variant: "confirmed",
          title: "Produto criado ",
        });
      });
    }
    setAttData(attData + 1);
  };

  const changeCheck = () => {
    console.log("aa");
    setCheck(!check);
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed  h-screen w-full top-0 left-0   opacity-2 z-40"
    >
      <div className="z-50 min-w-[350px] min-h-[500px] h-[80%] w-[70%] pt-10 px-10 fixed pt-8 px-1 pb-2 rounded-[5px] opacity-100 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[220px] ">
        <Title
          title="Criar produto"
          subtitle="preencha as informações abaixo"
        />
        <form
          onSubmit={handleSubmit(handleCreateProductSubmit)}
          className="flex relative h-full mt-[20px] flex-col gap-[20px]"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              // value={check}
              checked={check}
              onClick={changeCheck}
              // onChange={changeCheck}
              id="control"
              className="w-3 h-3 flex items-center justify-center"
            />
            <label
              htmlFor="control"
              className="text-[12px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              controlar estoque
            </label>
          </div>

          <div>
            <label className="font-bold">nome:</label>

            <Input
              {...register("name")}
              type="string"
              placeholder="Ex: Coxinha de frango"
            />
            {error?.includes("nome") ? (
              <p className="mt-1 text-[red] text-[12px]">{error}</p>
            ) : (
              ""
            )}
          </div>

          {/* colocar mask */}
          <div>
            <label className="font-bold">preço:</label>
            <Input
              {...register("price")}
              // type="number"
              type="string"
              placeholder="Ex: R$ 10,00"
            />
            {error?.includes("preço") ? (
              <p className="mt-1 text-[red] text-[12px]">{error}</p>
            ) : (
              ""
            )}
          </div>

          {check ? (
            <div>
              <label className="font-bold">quntidade:</label>
              <Input
                {...register("quantity")}
                // type="number"
                placeholder="Ex: 10"
              />
            </div>
          ) : (
            ""
          )}

          <div>
            <label className="font-bold">detalhes:</label>
            <Textarea
              {...register("details")}
              placeholder="Ex: Entregar um ketchup "
            />
          </div>

          <div className="absolute flex gap-1 bottom-24 right-0">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setCreateProductVisible(!createProductVisible);
              }}
              variant="outline"
            >
              Cancelar
            </Button>

            <Button disabled={isPending} type="submit">
              {isPending ? <span className="loader"></span> : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
