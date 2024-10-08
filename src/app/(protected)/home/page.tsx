"use client";

import { AddProduct } from "@/components/AddProduct";
import { AllOrdersInfos } from "@/components/AllOrdersInfos";
import { ConfirmAlert } from "@/components/ConfirmAlert";
import { CreateOrder } from "@/components/CreateOrder";
import { CreateProduct } from "@/components/CreateProduct";
import { DivisorConcluded } from "@/components/DivisorConcluded";
import { OrderContainer } from "@/components/OrderContainer";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SetContext } from "@/contexts/setContext";
import { useContext, useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { formatMilliseconds, getTimeFormat } from "../../utils/getTimeFormat";
import { getOrderInfos } from "../../utils/getOrderInfos";
import { getSession } from "@/app/actions/auth-action";
import { signOut } from "next-auth/react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  EditProductQuantityController,
  GetProductController,
  ListProductController,
} from "@/app/actions/product-actions";
import { getUserController } from "@/app/actions/user-actions";
import {
  concludedOrderController,
  deleteOrderController,
  listOrderController,
} from "@/app/actions/order-actions";
import { string } from "yup";
import { useToast } from "@/components/ui/use-toast";
import { IoMenuOutline } from "react-icons/io5";

import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { CreateClient } from "@/components/CreateClient";
import { CreateGroup } from "@/components/CreateGroup";
import { editPrice, listClients } from "@/app/actions/client-actions";
import { priceMask } from "@/app/utils/masks";

type FilterType = "separate" | "mixed" | "pending" | "accomplished";
type OrderType = "arrival" | "recent";

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
  clientRegis: boolean;
  id: string;
  value: number;
  timeStart: bigint | number;
  timeConcluded: bigint | number | null;
  userId: string;
}

interface CreateProductProps {
  name: string;
  price: number;
  details: string;
  userId: string;
  quantity: number;
  control: boolean;
}

export default function Home() {
  // console.log(new Date().getTime());

  // console.log(getTimeFormat(new Date().getTime(), "hours"));
  // console.log(getTimeFormat(new Date().getTime(), "minutes"));
  // console.log("---", getTimeFormat(new Date().getTime(), "all"));
  // console.log(getTimeFormat(new Date().getTime(), "date"));

  // console.log("--", getTimeFormat(new Date().getTime() + 1000 * 60, "all"));

  // console.log(
  //   "-x-",
  //   getTimeFormat(new Date().getTime() - 1722260260334, "all")
  // );

  // console.log(getTimeFormat(new Date().getTime(), "all"));
  // console.log(
  //   getTimeFormat(
  //     new Date().getTime() +
  //       1000 * 60 * 60 * 1 +
  //       2000 +
  //       1000 * 60 * 12 +
  //       1000 * 60 * 3,
  //     "all"
  //   )
  // );

  // console.log(
  //   formatMilliseconds(
  //     new Date().getTime() -
  //       new Date().getTime() +
  //       1000 * 60 * 60 * 1 +
  //       2000 +
  //       1000 * 60 * 12 +
  //       1000 * 60 * 3
  //   )
  // );

  // 1722259867745;

  // const session = await auth();
  const { toast } = useToast();
  const router = useRouter();

  const [session, setSession] = useState({});
  const [orderType, setOrderType] = useState<OrderType>("arrival");
  const [filterType, setFilterType] = useState<FilterType>("separate");
  const [showData, setShowData] = useState(false);
  const [totalArrState, setTotalArrState] = useState([]);
  const [pendingArrState, setPendingArrState] = useState([]);
  const [accomplishedArrState, setAccomplishedArrState] = useState([]);
  const [ordersArr, setOrdersArr] = useState<OrderProps[]>([]);
  const [dateCur, setDateCur] = useState(
    getTimeFormat(new Date().getTime(), "date")?.split(" ")[0].split(",")[0]
  );

  // const { totalArr, pendingArr, accomplishedArr } = getOrderInfos(data);

  const [date, setDate] = useState<Date | undefined>(
    new Date()
    // to: addDays(new Date(2022, 0, 20), 20),
  );
  // const []

  const {
    cancelVisible,
    setCancelVisible,
    concludedConfirm,
    setConcludedConfirm,
    idConcluded,
    createVisible,
    setCreateVisible,
    addProduct,
    setAddProduct,
    createProductVisible,
    setCreateProductVisible,
    userIdContext,
    setUserIdContext,
    attData,
    setAttData,
    sidebar,
    setSidebar,
    createClientVisible,
    setCreateClientVisible,
    createGroupVisible,
    setCreateGroupVisible,
    isReg,
    setIsReg,
    defOrder,
  } = useContext(SetContext);

  const attFetch = async () => {
    console.log("dateCur", dateCur);
    if (userIdContext) {
      const orders = await listOrderController({
        id: userIdContext,
        date: dateCur as string,
      });
      console.log(orders);
      if (orders) {
        const ordersWithConvertedBigInt = orders.map((order) => ({
          ...order,
          timeStart: Number(order.timeStart), // Convertendo BigInt para number
          timeConcluded: order.timeConcluded ? Number(order.timeConcluded) : 0, // Convertendo BigInt para number
        }));
        setOrdersArr([...(ordersWithConvertedBigInt as [])]);
        const { totalArr, pendingArr, accomplishedArr } = getOrderInfos(orders);
        console.log("3 arr", totalArr, pendingArr, accomplishedArr);
        if (totalArr && pendingArr && accomplishedArr) {
          setTotalArrState(totalArr as []);
          setPendingArrState(pendingArr as []);
          setAccomplishedArrState(accomplishedArr as []);
        }
      }
    }
  };

  const fetchData = async () => {
    try {
      console.log("dateCur", dateCur);

      // const session = await auth();
      // const response = await fetch('/api/some-endpoint');
      // const result = await response.json();
      // setData(result);

      const session = await getSession();
      if (session?.user?.email) {
        const userInfos = await getUserController({
          email: session.user.email,
        });
        if (userInfos) {
          console.log("userIDD", userInfos?.id);
          setUserIdContext(userInfos?.id);
          const orders = await listOrderController({
            id: userInfos?.id,
            date: dateCur as string,
          });
          console.log(orders);
          if (orders) {
            const ordersWithConvertedBigInt = orders.map((order) => ({
              ...order,
              timeStart: Number(order.timeStart), // Convertendo BigInt para number
              timeConcluded: order.timeConcluded
                ? Number(order.timeConcluded)
                : 0, // Convertendo BigInt para number
            }));
            setOrdersArr([...(ordersWithConvertedBigInt as [])]);
            const { totalArr, pendingArr, accomplishedArr } =
              getOrderInfos(orders);
            console.log("3 arr", totalArr, pendingArr, accomplishedArr);
            if (totalArr && pendingArr && accomplishedArr) {
              setTotalArrState(totalArr as []);
              setPendingArrState(pendingArr as []);
              setAccomplishedArrState(accomplishedArr as []);
            }
          }
        }
        console.log(userInfos);
      }

      console.log(session);
      return;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    attFetch();
  }, [attData]);

  const toConcludedOrder = async () => {
    console.log(date);
    const concludedOrder = await concludedOrderController({ id: idConcluded });
    console.log(concludedOrder);
    // escrever a função para marcar como cncluido e att a lista
    console.log(idConcluded);
    setAttData(attData + 1);
    setConcludedConfirm(!concludedConfirm);
    toast({
      variant: "confirmed",
      title: "Pedido confirmado ",
    });
  };

  const toDeleteOrder = async () => {
    console.log(idConcluded);
    if (isReg) {
      console.log("defOrder", defOrder);
      const clientsArr = await listClients({ id: userIdContext });
      const curCli = clientsArr.find((e) => e.name === defOrder.client);

      const editedCli = await editPrice({
        id: curCli?.id as string,
        price: defOrder.value + (curCli?.price as number),
      });

      console.log(editedCli);

      defOrder.orderItems.map(async (e) => {
        const curProd = (await GetProductController({
          id: e.productId,
        })) as CreateProductProps;

        // campo control entraria aki, curProd.control ? curProd.quantity + e.quantity : 0
        const editProduct = await EditProductQuantityController({
          id: e.productId,
          quantity: curProd.control
            ? e.quantity + (curProd.quantity as number)
            : 0,
        });

        console.log(editProduct);
      });

      // fzr um find em um array de clientes e dps extornar o value da defOrder para o client fznd um editClient e colocando o resultado da soma do price do client com o defOrder, tambem fzr um loop no orderItems e devolver msm esquema

      await deleteOrderController({ id: idConcluded });

      setAttData(attData + 1);
      setCancelVisible(!cancelVisible);
      toast({
        variant: "confirmed",
        title: "Pedido excluído ",
      });
    } else {
      await deleteOrderController({ id: idConcluded });

      setAttData(attData + 1);
      setCancelVisible(!cancelVisible);
      toast({
        variant: "confirmed",
        title: "Pedido excluído ",
      });
    }
  };

  return (
    // medium: "976px",
    // small: "776px",
    <main
      className="overflow-hidden grid-cols-[1fr] small:grid-cols-[1fr_225px] medium:grid-cols-[1fr_345px]
    
      relative
    
    h-screen px-[18px] medium:px-[52px] py-[20px] small:py-[64px] medium:gap-[46px] gap-[20px] grid   "
    >
      <Sidebar />
      <div className="flex max-h-[450px] h400:max-h-[500px] h500:max-h-[600px] h600:max-h-[650px] h700:max-h-[700px] h875:max-h-[800px]  flex-col">
        {/* {session ? "" : <div>aaaa</div>} */}
        <div>
          <Button
            onClick={async () => {
              await signOut({
                callbackUrl: "/login",
              });
            }}
            variant="ghost"
            className="p-0 underline underline-1"
          >
            sair da conta
          </Button>
        </div>
        <div className="mb-3 mt-2">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => {
              // console.log("gg");
              setSidebar(true);
            }}
          >
            <IoMenuOutline size={28} />
          </Button>
        </div>

        <Title
          title="Lista de pedidos"
          subtitle="todos os pedidos realizados ordenadamente"
        />

        <div className="small:hidden">
          <Button
            onClick={() => setShowData(!showData)}
            variant="ghost"
            className="p-0 mt-2 underline underline-[1px] underline-offset-4"
          >
            <p>ver os dados dos pedidos</p>
          </Button>
        </div>

        <div
          className={` ${
            showData ? "hidden small:block" : ""
          } pt-[20px] flex items-center justify-between`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[10s0px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  <span>
                    {getTimeFormat(date.getTime(), "date")?.split(",")[0]}
                  </span>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onMonthChange={() => {
                  console.log(date);
                }}
                onSelect={(e) => {
                  setDate(e);
                  if (e) {
                    setDateCur(
                      getTimeFormat(e.getTime(), "date")
                        ?.split(" ")[0]
                        .split(",")[0]
                    );
                    console.log(
                      getTimeFormat(e.getTime(), "date")
                        ?.split(" ")[0]
                        .split(",")[0]
                    );
                    setAttData(attData + 1);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => {
              setCreateClientVisible(!createClientVisible);
            }}
            // max-w-[110px]
            className="text-[12px]  medium:text-[16px]  "
          >
            <TiPlus className="hidden small:block" size={18} /> CLIENTE
          </Button>
        </div>
        <div
          className={`${
            showData ? "hidden small:block" : ""
          } pt-[5px] gap-[4px] flex justify-between`}
        >
          <div className="flex items-center gap-1">
            <Select onValueChange={(e) => setOrderType(e as OrderType)}>
              <SelectTrigger className="w-[92px] small:w-[120px]">
                <SelectValue
                  className="w-[92px] small:w-[120px]"
                  placeholder="chegada"
                />
              </SelectTrigger>
              <SelectContent className="w-[92px] small:w-[120px]">
                <SelectGroup className="w-[92px] small:w-[120px]">
                  <SelectItem
                    className="w-[92px] small:w-[120px]"
                    value="arrival"
                  >
                    chegada
                  </SelectItem>
                  <SelectItem
                    className="w-[92px] small:w-[120px]"
                    value="recent"
                  >
                    recente
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(e) => {
                console.log(e);
                setFilterType(e as FilterType);
              }}
            >
              <SelectTrigger className="w-[92px] small:w-[120px]">
                <SelectValue
                  placeholder="separado"
                  className="w-[92px] small:w-[120px]"
                />
              </SelectTrigger>
              <SelectContent className="w-[92px] small:w-[120px]">
                <SelectGroup className="w-[92px] small:w-[120px]">
                  <SelectItem
                    className="w-[92px] small:w-[120px]"
                    value="separate"
                  >
                    separado
                  </SelectItem>
                  <SelectItem
                    className="w-[92px] small:w-[120px]"
                    value="mixed"
                  >
                    misto
                  </SelectItem>
                  <SelectItem
                    className="w-[92px] small:w-[120px]"
                    value="pending"
                  >
                    pendente
                  </SelectItem>
                  <SelectItem
                    className="w-[92px] small:w-[120px]"
                    value="accomplished"
                  >
                    realizado
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 text-[20px]">
            {/* <Button
              onClick={() => {
                setCreateClientVisible(!createClientVisible);
              }}
              className="text-[12px]  medium:text-[16px]  "
            >
              <TiPlus className="hidden small:block" size={18} /> CLIENTE
            </Button> */}
            <Button
              onClick={() => {
                setCreateProductVisible(!createProductVisible);
              }}
              className="text-[12px]  medium:text-[16px]  "
            >
              <TiPlus className="hidden small:block" size={18} /> PRODUTO
            </Button>
            <Button
              onClick={() => setCreateVisible(!createVisible)}
              className="text-[12px]  medium:text-[16px]"
            >
              <TiPlus size={18} className="hidden small:block" /> PEDIDO
            </Button>
          </div>
        </div>
        <div
          className={`${
            showData ? "hidden small:block" : ""
          }  flex-1  custombar overflow-y-scroll gap-3 flex flex-col mt-[10px]`}
        >
          {
            // data
            ordersArr
              .sort((a, b) => {
                a.timeStart = Number(a.timeStart);
                b.timeStart = Number(b.timeStart);

                if (orderType == "arrival") {
                  return a.timeStart - b.timeStart;
                } else if (orderType == "recent") {
                  return b.timeStart - a.timeStart;
                } else {
                  return 0;
                }
              })
              .filter((e) => {
                if (filterType == "separate" || filterType == "pending") {
                  return e.concluded == false;
                } else if (filterType == "mixed") {
                  return e;
                } else if (filterType == "accomplished") {
                  return e.concluded == true;
                }
              })
              .map((e) => {
                return (
                  <OrderContainer
                    key={e.id}
                    id={e.id}
                    client={e.client}
                    value={e.value}
                    description={e.description}
                    orderItems={e.orderItems}
                    timeStart={e.timeStart}
                    concluded={e.concluded}
                    timeConcluded={e.timeConcluded}
                    clientRegis={e.clientRegis}
                  />
                );
              })
          }

          {filterType == "separate" ? (
            <>
              <DivisorConcluded />
              {
                // data
                ordersArr
                  .filter((e) => e.concluded == true)
                  .map((e) => {
                    return (
                      <OrderContainer
                        key={e.id}
                        id={e.id}
                        client={e.client}
                        value={e.value}
                        description={e.description}
                        orderItems={e.orderItems}
                        timeStart={e.timeStart}
                        timeConcluded={e.timeConcluded}
                        concluded={e.concluded}
                        clientRegis={e.clientRegis}
                      />
                    );
                  })
              }
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={`py-[20px] flex flex-col medium:px-[30px] px-[15px] border max-h-[700px] max-h-[450px] h400:max-h-[500px] h500:max-h-[600px] h600:max-h-[650px] h700:max-h-[700px] h875:max-h-[800px] border-[#DCDCDC] border-[0.5px] rounded-[5px] ${
          showData ? "" : "hidden small:flex"
        } `}
      >
        <h2 className="font-bold text-[17px]  medium:text-[20px]">
          dados dos pedidos
        </h2>

        <div className="flex-1  custombar-clean overflow-y-scroll gap-3 flex flex-col mt-[10px] pr-[10px]">
          <AllOrdersInfos title="pendentes" ordersProduct={pendingArrState} />

          <AllOrdersInfos
            title="realizados"
            ordersProduct={accomplishedArrState}
          />

          <AllOrdersInfos
            title="total"
            ordersProduct={
              totalArrState // totalArrState
            }
          />
        </div>

        <span className="h-[1px] mt-[20px] block bg-[#828282] w-full"></span>
        <div className="mt-[20px] mb-[40px] flex font-bold text-[17px]  medium:text-[20px] items-center justify-between">
          <h3
            className=" 
 "
          >
            vendido
          </h3>
          <span className="text-black">
            {/* R$ {totalArr.reduce((acc, e) => (acc += e.value), 0)},00 */}
            {priceMask(
              `${totalArrState
                .reduce((acc, e: OrderItemProps) => (acc += e.value), 0)
                .toFixed(2)}`
            )}
          </span>
        </div>

        <Button
          onClick={() => setCreateVisible(!createVisible)}
          className="w-full mt-auto  text-[16px]"
        >
          ADICIONAR PEDIDO
        </Button>
      </div>

      {cancelVisible ? (
        <ConfirmAlert
          type="cancel"
          visible={cancelVisible}
          cancel={setCancelVisible}
          toDo={toDeleteOrder}
          title="Deseja excluir"
          subtitle="o pedido?"
        />
      ) : (
        ""
      )}

      {concludedConfirm ? (
        <ConfirmAlert
          type="concluded"
          visible={concludedConfirm}
          cancel={setConcludedConfirm}
          toDo={toConcludedOrder}
          title="Deseja confirmar"
          subtitle="o pedido?"
        />
      ) : (
        ""
      )}

      {createVisible ? <CreateOrder /> : ""}

      {addProduct ? <AddProduct /> : ""}

      {createGroupVisible ? <CreateGroup /> : ""}

      {createProductVisible ? <CreateProduct edit={false} /> : ""}

      {createClientVisible ? <CreateClient edit={false} /> : ""}
    </main>
  );
}
