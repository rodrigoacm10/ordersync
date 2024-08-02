import { useContext, useState } from "react";
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

export function AddProduct() {
  const [quantity, setQuantity] = useState(1);

  const { addProduct, setAddProduct, addProductList, setAddProductList } =
    useContext(SetContext);

  const checkoutAddProductSchema = yupResolver(
    yup.object({
      product: yup.string().required("inserir campo"),
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
  const handleAddProductSubmit = (values: any) => {
    console.log("funcionou");
    setAddProductList([
      ...addProductList,
      {
        quantity: 10,
        product: "sla",
        value: 100,
      },
    ]);
    console.log(quantity);
    console.log(values);
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed  h-screen w-full top-0 left-0   opacity-2 z-40"
    >
      <form
        onSubmit={handleSubmit(handleAddProductSubmit)}
        className="z-50    px-7 fixed pt-6 px-1 pb-2 rounded-[5px] opacity-100 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2   "
      >
        <h2 className="font-bold text-[20px]">Adicionar produto</h2>
        <div className="flex items-center gap-2 mt-2">
          <Select
            onValueChange={(e) => {
              // console.log(e);
              setValue("product", e);
            }}
            // {...register("product")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue
                className="w-[120px]"
                placeholder="Selecionar produto"
              />
            </SelectTrigger>
            <SelectContent className=" ">
              <SelectGroup className=" ">
                <SelectItem className=" " value="chegada">
                  nome de produto muito ggrande
                </SelectItem>
                <SelectItem className=" " value="recente">
                  recente
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="bg-[#D9D9D9] rounded-xl    items-center flex">
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                } else {
                  return;
                }
              }}
              variant="outline"
            >
              {"<"}
            </Button>
            {/* <span className="font-bold">{quantity} </span> */}
            <Input
              type="number"
              className="font-bold bg-transparent border-0 flex items-center w-[80px] text-center  justify-center"
              value={quantity > 0 ? quantity : 1}
              onChange={(e) => setQuantity(+e.target.value)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                setQuantity(quantity + 1);
              }}
              variant="outline"
            >
              {">"}
            </Button>
          </div>

          <span className="font-bold">R$ 1000,00</span>
        </div>
        <div className="  mt-4  flex gap-1 justify-end ">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setAddProduct(!addProduct);
            }}
            variant="outline"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            // onClick={() => {
            //   setAddProduct(!addProduct);
            //   // setAddProductList([
            //   //   ...addProductList,
            //   //   {
            //   //     quantity: 10,
            //   //     product: "sla",
            //   //     value: 100,
            //   //   },
            //   // ]);
            // }}
          >
            Criar
          </Button>
        </div>
      </form>
    </div>
  );
}
