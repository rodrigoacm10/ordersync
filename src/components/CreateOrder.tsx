import { useContext, useEffect, useState, useTransition } from "react";
import { Title } from "./Title";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SetContext } from "@/contexts/setContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createOrderController } from "@/app/actions/order-actions";
import { getTimeFormat } from "@/app/utils/getTimeFormat";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
import { editPrice, listClients } from "@/app/actions/client-actions";
import { ConfirmAlert } from "./ConfirmAlert";
import {
  EditProductQuantityController,
  GetProductController,
} from "@/app/actions/product-actions";

export type Clients = {
  id: string;
  name: string;
  group: string;
  price: number;
  details: string;
};

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
  clientRegis: boolean;
  orderItems: OrderItemsProps[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  details?: string;
  quantity: number;
  userId: string;
}

export function CreateOrder() {
  const { toast } = useToast();

  // const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [clientsArr, setClientsArr] = useState<Clients[]>([]);
  const [err, setErr] = useState("");
  const [curClient, setCurClient] = useState<Clients>({
    id: "",
    name: "",
    group: "",
    price: 0,
    details: "",
  });
  const [orderInfos, setOrderInfo] = useState<CreateOrderProps>(
    {} as CreateOrderProps
  );

  const {
    createVisible,
    setCreateVisible,
    addProduct,
    setAddProduct,
    addProductList,
    setAddProductList,
    userIdContext,
    attData,
    setAttData,
    cliRegis,
    setCliRegis,
    concludedConfirm,
    setConcludedConfirm,
  } = useContext(SetContext);

  const selectSchema = () => {
    if (cliRegis) {
      return yupResolver(
        yup.object({
          client: yup.string(), // Retira o comentário e mantém opcional
          details: yup.string(),
        })
      );
    } else {
      return yupResolver(
        yup.object({
          client: yup.string().required("inserir campo"), // Mantém obrigatório aqui
          details: yup.string(),
        })
      );
    }
  };

  // const checkoutCreateOrderSchema = yupResolver(
  //   yup.object({
  //     client: yup.string().required("inserir campo"),
  //     details: yup.string(),
  //   })
  // );

  const formMethods = useForm({
    // defaultValues: {
    //   costValue: "0",
    //   profitMargin: "0",
    //   saleValue: "0",
    // },
    resolver: selectSchema() as any,
  });

  let cliMinusTotal =
    curClient.price -
    addProductList.reduce((acc, e) => (acc = acc + e.value), 0);

  const toCreateOrder = async () => {
    startTransition(async () => {
      const order = await createOrderController(orderInfos as CreateOrderProps);
      console.log(order);
      const editedClient = await editPrice({
        id: curClient.id,
        price: cliMinusTotal,
      });
      console.log(editedClient);
      console.log("aa");
      await updateAllProducts(orderInfos.orderItems);

      setErr("");
      toast({
        variant: "confirmed",
        title: "Pedido criado ",
      });
      setAddProductList([
        { quantity: 0, productId: "", productName: "", value: 0 },
      ]);
      setAttData(attData + 1);
      setConcludedConfirm(!concludedConfirm);
    });
  };

  const {
    reset,
    register,
    handleSubmit,
    watch,
    getValues,
    // setValue,
    formState: { errors },
  } = formMethods;

  // let arrProds = [...addProductList];

  const updateAllProducts = async (arrProds: OrderItemsProps[]) => {
    // ainda tem q fzr a logica, isso tá errado
    // pegar o get
    const promises = arrProds.map(async (e) => {
      const product = (await GetProductController({
        id: e.productId,
      })) as Product[];
      console.log("prr", product);

      const quantityAtt = product[0].quantity - e.quantity;
      console.log(quantityAtt, product[0].quantity, e.quantity);

      EditProductQuantityController({
        id: e.productId,
        quantity: quantityAtt > 0 ? e.quantity : 0,
      });
    });
    console.log(await Promise.all(promises));
  };

  // colocar os tipos
  const handleCreateOrderSubmit = async (values: any) => {
    startTransition(async () => {
      let arrProds = [...addProductList];
      arrProds.shift();
      console.log("funcionou");
      // console.log(addProductList.slice(0, 1));
      // console.log(addProductList);
      console.log(arrProds);
      console.log(values);

      if (cliRegis && curClient.name != "" && !!arrProds[0]) {
        // console.log("registrado", {
        //   client: curClient.name,
        //   description: values.details,
        //   value: addProductList.reduce(
        //     (acc, e) => (acc = acc + e.value),
        //     0
        //   ) as number,
        //   date: getTimeFormat(new Date().getTime(), "date")?.split(
        //     ","
        //   )[0] as string,
        //   timeStart: new Date().getTime(),
        //   timeConcluded: new Date().getTime(),
        //   userId: userIdContext,
        //   orderItems: arrProds,
        // });
        if (cliMinusTotal < 0) {
          setOrderInfo({
            client: curClient.name,
            description: values.details,
            value: addProductList.reduce(
              (acc, e) => (acc = acc + e.value),
              0
            ) as number,
            date: getTimeFormat(new Date().getTime(), "date")?.split(
              ","
            )[0] as string,
            timeStart: new Date().getTime(),
            timeConcluded: new Date().getTime(),
            userId: userIdContext,
            orderItems: arrProds,
            clientRegis: true,
          });
          setConcludedConfirm(!concludedConfirm);
          // console.log("operação cancelada");
          arrProds = [
            { quantity: 0, productId: "", productName: "", value: 0 },
          ];

          return;
        }

        const order = await createOrderController({
          client: curClient.name,
          description: values.details,
          value: addProductList.reduce(
            (acc, e) => (acc = acc + e.value),
            0
          ) as number,
          date: getTimeFormat(new Date().getTime(), "date")?.split(
            ","
          )[0] as string,
          timeStart: new Date().getTime(),
          timeConcluded: new Date().getTime(),
          userId: userIdContext,
          orderItems: arrProds,
          clientRegis: true,
        });
        console.log("registrado", order);
        const editedClient = await editPrice({
          id: curClient.id,
          price: cliMinusTotal,
        });
        console.log(editedClient);

        await updateAllProducts(arrProds);
        setErr("");
        toast({
          variant: "confirmed",
          title: "Pedido criado ",
        });
      } else if (!cliRegis && !!arrProds[0]) {
        // console.log("não registrado", {
        //   client: values.client,
        //   description: values.details,
        //   value: addProductList.reduce(
        //     (acc, e) => (acc = acc + e.value),
        //     0
        //   ) as number,
        //   date: getTimeFormat(new Date().getTime(), "date")?.split(
        //     ","
        //   )[0] as string,
        //   timeStart: new Date().getTime(),
        //   timeConcluded: new Date().getTime(),
        //   userId: userIdContext,
        //   orderItems: arrProds,
        // });
        const order = await createOrderController({
          client: values.client,
          description: values.details,
          value: addProductList.reduce(
            (acc, e) => (acc = acc + e.value),
            0
          ) as number,
          date: getTimeFormat(new Date().getTime(), "date")?.split(
            ","
          )[0] as string,
          timeStart: new Date().getTime(),
          timeConcluded: new Date().getTime(),
          userId: userIdContext,
          orderItems: arrProds,
          clientRegis: false,
        });
        console.log("não registrado", order);

        await updateAllProducts(arrProds);

        setErr("");
        toast({
          variant: "confirmed",
          title: "Pedido criado ",
        });
      } else if (cliRegis && curClient.name == "") {
        setErr("*adicione cliente");
        console.log("retornar erro");
        return;
      } else if (!arrProds[0]) {
        setErr("*adicione produto");
        return;
      }

      setAttData(attData + 1);

      setAddProductList([
        { quantity: 0, productId: "", productName: "", value: 0 },
      ]);
      arrProds = [{ quantity: 0, productId: "", productName: "", value: 0 }];
      setCreateVisible(!createVisible);
      reset();
    });
  };

  const getInfos = async () => {
    const data = await listClients({ id: userIdContext });
    console.log(data);
    setClientsArr(data as Clients[]);

    // const data = await getUsers();
    console.log("UserIDDCli", userIdContext);
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed  h-screen w-full top-0 left-0   opacity-2 z-40"
    >
      <div className="z-50 min-w-[350px] min-h-[500px] h-[80%] w-[70%] pt-10 px-7 small:px-10 fixed pt-4 small:pt-8 px-1 pb-2 rounded-[5px] opacity-100 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[220px] ">
        <Title
          title="Adicionar pedido"
          subtitle="preencha as informações abaixo"
        />
        <form
          onSubmit={handleSubmit(handleCreateOrderSubmit)}
          className="flex relative h-full mt-[20px] flex-col gap-[8px] small:gap-[20px]"
        >
          <div>
            <Select
              // {...register("group")}
              onValueChange={(e) => {
                if (e == "registered") {
                  setCliRegis(true);
                } else if (e == "loose") {
                  setCliRegis(false);
                }
                // setGroupSelect(e);
                console.log(e);
              }}
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue
                  className="w-[170px]"
                  placeholder={
                    cliRegis ? "cliente resgistrado" : "cliente avulso"
                  }
                />
              </SelectTrigger>
              <SelectContent className="w-[170px]">
                <SelectGroup className="w-[170px]">
                  <SelectItem className="w-[170px]" value="loose">
                    cliente avulso
                  </SelectItem>

                  <SelectItem className="w-[170px]" value="registered">
                    cliente resgistrado
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <label className="text-[14px] small:text-[16px] font-bold">
              de:
            </label>
            {cliRegis ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {/* {value
                   ? clientsArr.find((framework) => framework.id === value)
                       ?.name
                   : "Encontre o cliente"} */}
                    {value
                      ? clientsArr.find((framework) => framework.name === value)
                          ?.name
                      : "Encontre o cliente"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="">
                    <CommandInput placeholder="Encontre o cliente..." />
                    <CommandList>
                      <CommandEmpty>Nenhum cliente encontrado</CommandEmpty>
                      <CommandGroup>
                        {clientsArr.map((framework) => (
                          <CommandItem
                            className="w-full"
                            key={framework.id}
                            value={framework.name}
                            onSelect={(currentValue: any) => {
                              console.log(currentValue);
                              const selectCli = clientsArr.find(
                                (cli) => cli.name == currentValue
                              );
                              console.log(selectCli);
                              setCurClient(selectCli as Clients);

                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              <Input
                {...register("client")}
                type="string"
                placeholder="Ex: Rodrigo Eduado"
              />
            )}
            {err == "*adicione cliente" ? (
              <p className="text-[red] text-[12px] ml-4">{err}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col items-start">
            <label className="text-[14px] small:text-[16px] font-bold">
              produtos:
            </label>

            {/* <div className="flex items-center gap-2"></div> */}
            <div
              className={`${
                addProductList.length > 4
                  ? "scrollbarx custombar-clea pr-2 max-h-[88px] overflow-scrol"
                  : ""
              } w-[300px] max-h-[120px] flex flex-col gap-1 small:gap-2 mt-2`}
            >
              {addProductList
                .filter((e) => e.quantity > 0)
                .map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[#828282] flex items-center justify-between relative text-[15px] small:text-[16px]"
                    >
                      <p className="  ">
                        {e.quantity}x {e.productName}
                      </p>

                      <span className="flex items-center justify-end   w-[170px] font-bold text-black">
                        R$ {e.value},00
                      </span>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          const newProductList = addProductList.filter(
                            (_, index) => index !== i + 1
                          );

                          console.log(newProductList);

                          setAddProductList([...newProductList]);
                        }}
                        className="absolute -left-8"
                        variant="ghost"
                      >
                        x
                      </Button>
                    </div>
                  );
                })}
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault();
                setAddProduct(!addProduct);
              }}
              className="text-[#828282] flex items-center gap-2 "
              variant="ghost"
            >
              adicionar produto{" "}
              <div className="bg-black rounded-full h-7 w-7 text-white flex items-center justify-center">
                +
              </div>
            </Button>
            {err == "*adicione produto" && !addProductList[1] ? (
              <p className="text-[red] text-[12px] ml-4">{err}</p>
            ) : (
              ""
            )}
            <span className="mt-2 w-[300px] block h-[1px] bg-[#D9D9D9]"></span>

            {cliRegis ? (
              <p className="w-[300px] mt-1 small:mt-3 font-bold flex justify-between text-[14px] small:text-[16px] ">
                cliente possui
                <span>{`R$ ${curClient.price},00`}</span>
              </p>
            ) : (
              ""
            )}
            {cliRegis ? (
              <p className="w-[300px] mt-1 small:mt-3 font-bold flex justify-between text-[14px] small:text-[16px]">
                vai possuir
                <span
                  className={`${cliMinusTotal < 0 ? "text-[red]" : ""}`}
                >{`R$ ${cliMinusTotal},00`}</span>
              </p>
            ) : (
              ""
            )}

            <p className="w-[300px] mt-2 small:mt-3 font-bold flex justify-between text-[14px] small:text-[16px]">
              total
              <span>
                {`R$ ${addProductList.reduce(
                  (acc, e) => (acc = acc + e.value),
                  0
                )},00`}
              </span>
            </p>
          </div>
          <div>
            <label className="text-[14px] small:text-[16px] font-bold">
              detalhes:
            </label>
            <Textarea
              className="h-[20px]   small:h-[80px]"
              {...register("details")}
              placeholder="Ex: Retirar a alface do hamburguer ou o cliente deixou reservado e pago"
            />
          </div>
          <div className="absolute flex gap-1 bottom-24 right-0">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setAddProductList([
                  { quantity: 0, productId: "", productName: "", value: 0 },
                ]);

                setCurClient({
                  id: "",
                  name: "",
                  group: "",
                  price: 0,
                  details: "",
                });

                setCreateVisible(!createVisible);
              }}
              variant="outline"
            >
              Cancelar
            </Button>

            <Button disabled={isPending} type="submit">
              {isPending ? <span className="loader"></span> : "Criar"}
            </Button>
          </div>{" "}
          {concludedConfirm ? (
            <ConfirmAlert
              type="concluded"
              visible={concludedConfirm}
              cancel={setConcludedConfirm}
              toDo={toCreateOrder}
              title="Deseja confirmar"
              subtitle="o pedido?"
              sub="O cliente vai ficar com saldo negativo"
            />
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
