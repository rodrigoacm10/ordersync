"use client";

import { AddProduct } from "@/components/AddProduct";
import { AllOrdersInfos } from "@/components/AllOrdersInfos";
import { ConfirmAlert } from "@/components/ConfirmAlert";
import { CreateOrder } from "@/components/CreateOrder";
import { CreateProduct } from "@/components/CreateProduct";
import { DivisorConcluded } from "@/components/DivisorConcluded";
import { OrderContainer, OrderProps } from "@/components/OrderContainer";
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
import { auth } from "@/app/services/auth";
import { getSession } from "@/app/actions/auth-action";
import { signOut } from "next-auth/react";

const data = [
  {
    id: "asd1",
    client: "fulaninho",
    value: 28,
    description:
      "lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho",
    order: [
      { quantity: 200, product: "ssla", value: 100 },
      { quantity: 200, product: "ssla2", value: 101 },
      { quantity: 200, product: "ssla3", value: 102 },
      { quantity: 200, product: "ssla", value: 103 },
    ],
    timeStart: 1722257337246,
    timeConcluded: 1,
    concluded: false,
  },

  {
    id: "asd2",
    client: "fulaninho",
    value: 28,
    description:
      "lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho",
    order: [
      { quantity: 200, product: "ssla", value: 104 },
      { quantity: 200, product: "ssla2", value: 105 },
      { quantity: 200, product: "ssla3", value: 106 },
      { quantity: 200, product: "ssla", value: 107 },
    ],
    timeConcluded: 1,
    timeStart: 1722257852524,
    concluded: false,
  },

  {
    id: "asd3",
    client: "fulaninho alberto costa filho",
    value: 28,
    description:
      "lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn ",
    order: [
      { quantity: 200, product: "ssla", value: 108 },
      { quantity: 200, product: "ssla2", value: 109 },
      { quantity: 200, product: "ssla3", value: 110 },
      { quantity: 200, product: "ssla", value: 111 },
    ],
    timeConcluded: 1,
    timeStart: 1722258355187,
    concluded: false,
  },

  {
    id: "asd4",
    client: "fulaninho",
    value: 28,
    description:
      "lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho",
    order: [
      { quantity: 200, product: "ssla", value: 112 },
      { quantity: 200, product: "ssla2", value: 113 },
      { quantity: 200, product: "ssla3", value: 114 },
      { quantity: 200, product: "ssla", value: 115 },
    ],
    timeStart: 1722258765112,
    timeConcluded: 1722263782800,
    concluded: true,
  },
];

type FilterType = "separate" | "mixed" | "pending" | "accomplished";
type OrderType = "arrival" | "recent";

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

  const [session, setSession] = useState({});

  useEffect(() => {
    // getSession();
    const fetchData = async () => {
      try {
        // const session = await auth();
        // const response = await fetch('/api/some-endpoint');
        // const result = await response.json();
        // setData(result);
        const session = await getSession();
        console.log(session);

        // console.log(session);
        // if (!session) return;
        // setSession(session);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  const [orderType, setOrderType] = useState<OrderType>("arrival");
  const [filterType, setFilterType] = useState<FilterType>("separate");
  const [showData, setShowData] = useState(false);

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
  } = useContext(SetContext);

  const { totalArr, pendingArr, accomplishedArr } = getOrderInfos(data);

  const toConcludedOrder = () => {
    // escrever a função para marcar como cncluido e att a lista
    console.log(idConcluded);
  };

  const toDeleteOrder = () => {
    console.log(idConcluded);
  };

  return (
    // medium: "976px",
    // small: "776px",
    <main
      className="overflow-hidden grid-cols-[1fr] small:grid-cols-[1fr_225px] medium:grid-cols-[1fr_345px]
    
    
    h-screen px-[24px] medium:px-[52px] py-[25px] small:py-[64px] medium:gap-[46px] gap-[20px] grid   "
    >
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
        <Title
          title="Lista de produtos"
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
          className={`${
            showData ? "hidden small:block" : ""
          } pt-[20px] gap-2 flex justify-between`}
        >
          <div className="flex items-center gap-1">
            <Select onValueChange={(e) => setOrderType(e as OrderType)}>
              <SelectTrigger className="w-[95px] small:w-[120px]">
                <SelectValue
                  className="w-[95px] small:w-[120px]"
                  placeholder="chegada"
                />
              </SelectTrigger>
              <SelectContent className="w-[95px] small:w-[120px]">
                <SelectGroup className="w-[95px] small:w-[120px]">
                  <SelectItem
                    className="w-[95px] small:w-[120px]"
                    value="arrival"
                  >
                    chegada
                  </SelectItem>
                  <SelectItem
                    className="w-[95px] small:w-[120px]"
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
              <SelectTrigger className="w-[95px] small:w-[120px]">
                <SelectValue
                  placeholder="separado"
                  className="w-[95px] small:w-[120px]"
                />
              </SelectTrigger>
              <SelectContent className="w-[95px] small:w-[120px]">
                <SelectGroup className="w-[95px] small:w-[120px]">
                  <SelectItem
                    className="w-[95px] small:w-[120px]"
                    value="separate"
                  >
                    separado
                  </SelectItem>
                  <SelectItem
                    className="w-[95px] small:w-[120px]"
                    value="mixed"
                  >
                    misto
                  </SelectItem>
                  <SelectItem
                    className="w-[95px] small:w-[120px]"
                    value="pending"
                  >
                    pendente
                  </SelectItem>
                  <SelectItem
                    className="w-[95px] small:w-[120px]"
                    value="accomplished"
                  >
                    realizado
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 text-[20px]">
            <Button
              onClick={() => setCreateProductVisible(!createProductVisible)}
              className="text-[14px]  medium:text-[16px]  "
            >
              <TiPlus className="hidden small:block" size={18} /> PRODUTO
            </Button>
            <Button
              onClick={() => setCreateVisible(!createVisible)}
              className="text-[14px]  medium:text-[16px]"
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
          {data
            .sort((a, b) => {
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
                  order={e.order}
                  timeStart={e.timeStart}
                  concluded={e.concluded}
                  timeConcluded={e.timeConcluded}
                />
              );
            })}

          {/* <OrderContainer
            id="asd"
            client="fulaninho"
            value={28}
            description="lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho"
            order={[
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
            ]}
            timeStart="16:23"
            concluded={false}
          />
          <OrderContainer
            id="asd2"
            client="fulaninho"
            value={28}
            description="lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho"
            order={[
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
            ]}
            concluded={false}
            timeStart="16:23"
          />
          <OrderContainer
            id="asd3"
            client="fulaninho"
            value={28}
            description="lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinho lorem asdn asupurtinholorem asdn asupurtinho lorem asdn asupurtinho"
            order={[
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
            ]}
            concluded={false}
            timeStart="16:23"
          /> */}
          {filterType == "separate" ? (
            <>
              <DivisorConcluded />
              {data
                .filter((e) => e.concluded == true)
                .map((e) => {
                  return (
                    <OrderContainer
                      key={e.id}
                      id={e.id}
                      client={e.client}
                      value={e.value}
                      description={e.description}
                      order={e.order}
                      timeStart={e.timeStart}
                      timeConcluded={e.timeConcluded}
                      concluded={e.concluded}
                    />
                  );
                })}
            </>
          ) : (
            ""
          )}
          {/* <OrderContainer
            id="asd4"
            client="fulaninho"
            value={28}
            description=""
            order={[
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
              { quantity: 200, product: "ssla" },
            ]}
            concluded={true}
            timeStart="16:23"
          /> */}
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
          <AllOrdersInfos
            title="pendentes"
            ordersProduct={
              pendingArr
              //   [
              //   { quantity: 16, product: "pastel de carne" },
              //   { quantity: 2, product: "kitkat" },
              // ]
            }
          />

          <AllOrdersInfos
            title="realizados"
            ordersProduct={
              accomplishedArr
              // [{ quantity: 2, product: "pastel de carne" }]
            }
          />

          <AllOrdersInfos
            title="total"
            ordersProduct={
              // totalArr
              [
                { quantity: 100, product: "pastel de carne azul" },
                { quantity: 2, product: "kitkat" },
                { quantity: 100, product: "pastel de carne" },
                { quantity: 2, product: "kitkat" },
                { quantity: 100, product: "pastel de carne" },
                { quantity: 2, product: "kitkat" },
                { quantity: 100, product: "pastel de carne" },
                { quantity: 2, product: "kitkat" },
                { quantity: 100, product: "pastel de carne" },
                { quantity: 2, product: "kitkat" },
                { quantity: 100, product: "pastel de carne" },
                { quantity: 2, product: "kitkat" },
              ]
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
            R$ {totalArr.reduce((acc, e) => (acc += e.value), 0)},00
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
          title="Deseja excluir"
          subtitle="o pedido?"
        />
      ) : (
        ""
      )}

      {createVisible ? <CreateOrder /> : ""}

      {addProduct ? <AddProduct /> : ""}

      {createProductVisible ? <CreateProduct /> : ""}
    </main>
  );
}
