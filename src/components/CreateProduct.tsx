import { useContext, useTransition } from "react";
import { Title } from "./Title";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SetContext } from "@/contexts/setContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createProductController } from "@/app/actions/product-actions";
import { useToast } from "./ui/use-toast";

export function CreateProduct() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const { userIdContext, createProductVisible, setCreateProductVisible } =
    useContext(SetContext);

  const checkoutCreateProductSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      price: yup.string().required("inserir campo"),
      details: yup.string(),
    })
  );

  const formMethods = useForm({
    // defaultValues: {
    //   costValue: "0",
    //   profitMargin: "0",
    //   saleValue: "0",
    // },
    resolver: checkoutCreateProductSchema,
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
  const handleCreateProductSubmit = async (values: any) => {
    startTransition(async () => {
      console.log("funcionou");
      console.log(values);
      const newProduct = await createProductController({
        name: values.name,
        price: +values.price,
        details: values.details,
        userId: userIdContext,
      });
      console.log(newProduct);
      setCreateProductVisible(!createProductVisible);
      reset();
      toast({
        variant: "confirmed",
        title: "Produto criado ",
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
          title="Criar produto"
          subtitle="preencha as informações abaixo"
        />
        <form
          onSubmit={handleSubmit(handleCreateProductSubmit)}
          className="flex relative h-full mt-[20px] flex-col gap-[20px]"
        >
          <div>
            <label className="font-bold">nome:</label>

            <Input
              {...register("name")}
              type="string"
              placeholder="Ex: Coxinha de frango"
            />
          </div>

          {/* colocar mask */}
          <div>
            <label className="font-bold">preço:</label>
            <Input
              {...register("price")}
              type="number"
              placeholder="Ex: R$ 10,00"
            />
          </div>

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
