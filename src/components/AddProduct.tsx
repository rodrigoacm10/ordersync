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

export function AddProduct() {
  interface Product {
    id: string;
    name: string;
    price: number;
    details?: string;
    userId: string;
  }
  const [quantity, setQuantity] = useState(1);
  const [productList, setProductList] = useState<Product[]>([]);
  const [curProduct, setCurProduct] = useState<Product>();
  const [allPrice, setAllPrice] = useState(0);

  const {
    userIdContext,
    addProduct,
    setAddProduct,
    addProductList,
    setAddProductList,
  } = useContext(SetContext);

  const getInfos = async () => {
    const products = await ListProductController({ id: userIdContext });
    console.log(products);
    if (products) {
      setProductList([...(products as Product[])]);
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

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
    console.log(values);

    // console.log("funcionou");
    setAddProductList([
      ...addProductList,
      {
        quantity: quantity,
        productId: values.product,
        productName: curProduct?.name as string,
        // product: "sla",
        value: allPrice,
      },
    ]);
    console.log(quantity);
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
              console.log(e);
              const prod = productList.find((el) => el.id == e);

              setCurProduct(prod);
              setAllPrice(prod?.price as number);
              setValue("product", e);
            }}
            {...register("product")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue
                className="w-[120px]"
                placeholder="Selecionar produto"
              />
            </SelectTrigger>
            <SelectContent className=" ">
              <SelectGroup className=" ">
                {productList.map((e) => {
                  return (
                    <SelectItem
                      onClick={() => {
                        // console.log(e.name);
                        console.log("aaaaaaaa");
                      }}
                      key={e.id}
                      className=" "
                      value={`${e.id}`}
                    >
                      {e.name}
                    </SelectItem>
                  );
                })}
                {/* <SelectItem className=" " value="chegada">
                  nome de produto muito ggrande
                </SelectItem>
                <SelectItem className=" " value="recente">
                  recente
                </SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="bg-[#D9D9D9] rounded-xl    items-center flex">
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  console.log(curProduct?.price);
                  setAllPrice((curProduct?.price as number) * (quantity - 1));
                } else {
                  setQuantity(1);
                  // return;
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
                console.log(curProduct?.price);

                setAllPrice((curProduct?.price as number) * (quantity + 1));
              }}
              variant="outline"
            >
              {">"}
            </Button>
          </div>

          <span className="font-bold">
            {curProduct ? `R$ ${allPrice}` : ""}{" "}
          </span>
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
            // onClick={(e) => {
            //   e.preventDefault();
            // }}
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
