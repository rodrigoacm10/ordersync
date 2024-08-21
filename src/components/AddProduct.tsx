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
import { priceMask } from "@/app/utils/masks";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(false);
  const [valueProp, setValueProp] = useState("");

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

    console.log(addProductList.find((e) => e.productId === values.product));
    // console.log("funcionou");
    const curProd = addProductList.find((e) => e.productId === values.product);
    console.log("length", addProductList.length);
    console.log("condi", curProd || addProductList.length == 1);

    if (!curProd || addProductList.length == 1) {
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
    } else {
      const prodListCopy = [...addProductList];
      const attProdList = prodListCopy.map((e) => {
        if (e.productId === values.product) {
          const allQuantity = e.quantity + quantity;
          const prodPrice = e.value / e.quantity;
          console.log("quantidades", allQuantity, e.quantity, quantity);
          e.quantity = allQuantity;
          e.value = prodPrice * allQuantity;
          return e;
        } else return e;
      });

      setAddProductList([...attProdList]);
      console.log(attProdList);
    }

    console.log(quantity);
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed  h-screen w-full top-0 left-0   opacity-2 z-40"
    >
      <form
        onSubmit={handleSubmit(handleAddProductSubmit)}
        // px-7 pt-6 px-1 pb-2
        className="z-50   px-3 pt-3 w500:px-7 w500:pt-6 pb-2 fixed rounded-[5px] opacity-100 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2   "
      >
        <h2 className="font-bold text-[16px] w500:text-[20px]">
          Adicionar produto
        </h2>
        <div className="flex items-center gap-1 w500:gap-2 mt-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[140px] justify-center"
              >
                {/* {value
                   ? clientsArr.find((framework) => framework.id === value)
                       ?.name
                   : "Encontre o cliente"} */}
                {valueProp
                  ? productList.find((framework) => framework.id === valueProp)
                      ?.name
                  : "Procurar produto"}
                {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[140px] p-0">
              <Command className="">
                <CommandInput placeholder="Procurar produto" />
                <CommandList>
                  <CommandEmpty>Nenhum produto encontrado</CommandEmpty>
                  <CommandGroup>
                    {productList.map((framework) => (
                      <CommandItem
                        className="w-[140px]"
                        key={framework.id}
                        value={framework.id}
                        onSelect={(currentValue: any) => {
                          // console.log(currentValue);
                          // const selectCli = productList.find(
                          //   (cli) => cli.name == currentValue
                          // );
                          // console.log(selectCli);

                          console.log(currentValue);
                          const prod = productList.find(
                            (el) => el.id == currentValue
                          );

                          setCurProduct(prod);
                          setQuantity(1);
                          setAllPrice(prod?.price as number);
                          setValue("product", currentValue);

                          setValueProp(
                            currentValue === valueProp ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueProp === framework.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.name == "" ? "nenhum" : framework.name}
                        {/* {framework.name} */}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* <Select
            onValueChange={(e) => {
              console.log(e);
              const prod = productList.find((el) => el.id == e);

              setCurProduct(prod);
              setQuantity(1);
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
                
              </SelectGroup>
            </SelectContent>
          </Select> */}
          {/* <SelectItem className=" " value="chegada">
                  nome de produto muito ggrande
                </SelectItem>
                <SelectItem className=" " value="recente">
                  recente
                </SelectItem>   */}

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
              className="font-bold bg-transparent border-0 flex items-center w-[70px] w500:w-[80px] text-[14px] w500:text-[16px] text-center  justify-center"
              value={quantity > 0 ? quantity : 1}
              onChange={(e) => {
                setQuantity(+e.target.value);

                if (+e.target.value > 0) {
                  setAllPrice((curProduct?.price as number) * +e.target.value);
                }
                1;
              }}
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

          <span className="text-[14px] w500:text-[16px] font-bold">
            {curProduct ? `${priceMask(`${allPrice.toFixed(2)}`)}` : ""}{" "}
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
