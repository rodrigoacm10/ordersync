import { useContext, useTransition } from "react";
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

export function CreateOrder() {
  const { toast } = useToast();

  // const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
  } = useContext(SetContext);

  const checkoutCreateOrderSchema = yupResolver(
    yup.object({
      client: yup.string().required("inserir campo"),
      details: yup.string(),
    })
  );

  const formMethods = useForm({
    // defaultValues: {
    //   costValue: "0",
    //   profitMargin: "0",
    //   saleValue: "0",
    // },
    resolver: checkoutCreateOrderSchema,
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
      });
      setAttData(attData + 1);

      console.log(order);
      setAddProductList([
        { quantity: 0, productId: "", productName: "", value: 0 },
      ]);
      arrProds = [{ quantity: 0, productId: "", productName: "", value: 0 }];
      setCreateVisible(!createVisible);
      reset();
      toast({
        variant: "confirmed",
        title: "Pedido criado ",
      });
    });
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed  h-screen w-full top-0 left-0   opacity-2 z-40"
    >
      <div className="z-50 min-w-[350px] min-h-[500px] h-[80%] w-[70%] pt-10 px-10 fixed pt-8 px-1 pb-2 rounded-[5px] opacity-100 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[220px] ">
        <Title
          title="Adicionar pedido"
          subtitle="preencha as informações abaixo"
        />
        <form
          onSubmit={handleSubmit(handleCreateOrderSubmit)}
          className="flex relative h-full mt-[20px] flex-col gap-[20px]"
        >
          <div>
            <label className="font-bold">de:</label>
            <Input
              {...register("client")}
              type="string"
              placeholder="Ex: Rodrigo Eduado"
            />
          </div>

          <div className="flex flex-col items-start">
            <label className="font-bold">produtos:</label>
            {/* <div className="flex items-center gap-2"></div> */}
            <div
              className={`${
                addProductList.length > 4
                  ? " custombar-clean pr-2 overflow-y-scroll"
                  : ""
              } w-[300px] max-h-[120px] flex flex-col gap-2 mt-2`}
            >
              {addProductList
                .filter((e) => e.quantity > 0)
                .map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[#828282] flex items-center justify-between"
                    >
                      <p className="  ">
                        {e.quantity}x {e.productName}
                      </p>

                      <span className="flex items-center justify-end   w-[170px] font-bold text-black">
                        R$ {e.value},00
                      </span>
                    </div>
                  );
                })}
            </div>

            <Button
              onClick={() => setAddProduct(!addProduct)}
              className="text-[#828282] flex items-center gap-2"
              variant="ghost"
            >
              adicionar produto{" "}
              <div className="bg-black rounded-full h-7 w-7 text-white flex items-center justify-center">
                +
              </div>
            </Button>
            <span className="mt-2 w-[300px] block h-[1px] bg-[#D9D9D9]"></span>
            <p className="w-[300px] mt-3 font-bold flex justify-between">
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
            <label className="font-bold">detalhes:</label>
            <Textarea
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

                setCreateVisible(!createVisible);
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
