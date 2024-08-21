import { useContext, useEffect, useState, useTransition } from "react";
import { Title } from "./Title";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SetContext } from "@/contexts/setContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "./ui/use-toast";
import { createClient, editClient } from "@/app/actions/client-actions";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { listGroups } from "@/app/actions/group-actions";
import { priceMask } from "@/app/utils/masks";

interface GroupProps {
  id: string;
  name: string;
  userId: string;
}

export function CreateClient({
  edit,
  id,
  name,
  price,
  details,
  group,
}: {
  edit: boolean;
  id?: string;
  name?: string;
  price?: number;
  details?: string;
  group?: string;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [infos, setInfos] = useState(false);
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const [groupSelect, setGroupSelect] = useState(".@");
  const [selected, setSelected] = useState(false);

  const {
    userIdContext,
    createClientVisible,
    setCreateClientVisible,
    createGroupVisible,
    setCreateGroupVisible,
    attData,
    setAttData,
  } = useContext(SetContext);

  const checkoutCreateProductSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      price: yup.string().required("inserir campo"),
      details: yup.string(),
      group: yup.string(),
    })
  );

  const formMethods = useForm({
    defaultValues: {
      name: name ? name : "",
      price: price ? `${price.toFixed(2)}` : "0",
      details: details ? details : "",

      //   costValue: "0",
      //   profitMargin: "0",
      //   saleValue: "0",
    },
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

  const groupEditVal = () => {
    // arrumar iss o
    if (group != groupSelect && groupSelect != ".@" && groupSelect != "add") {
      return groupSelect;
    } else if (group == null && (groupSelect == ".@" || groupSelect == "add")) {
      return "";
    }
    // else if (group && groupSelect == ".@") {
    //   return "b";
    // }
    else if (
      group &&
      selected == false &&
      (groupSelect == ".@" || groupSelect == "add")
    ) {
      return group;
    } else if (
      group &&
      selected == true &&
      (groupSelect == ".@" || groupSelect == "add")
    ) {
      return "";
    }
  };

  const priceValue = watch("price");

  useEffect(() => {
    // setValue("price", priceValueMask(priceValue));
    setValue("price", priceMask(priceValue));
  }, [priceValue]);

  // colocar os tipos
  const handleCreateClientSubmit = async (values: any) => {
    if (edit) {
      startTransition(async () => {
        console.log("funcionou");
        console.log(values);

        // const newClient = await createClient({
        //   name: values.name,
        //   group: groupSelect == ".@" ? "" : groupSelect,
        // price: +values.price,
        // details: values.details,
        // userId: userIdContext,
        // });

        console.log("group", group);
        console.log("select", groupSelect);

        const newClient = await editClient({
          id: id as string,
          name: values.name,
          price: +values.price
            .split(" ")[1]
            .replaceAll(".", "")
            .replaceAll(",", "."),
          // price: +values.price,
          details: values.details,
          group: groupEditVal() as string,
          // userId: userIdContext,
        });
        console.log(newClient);
        setCreateClientVisible(!createClientVisible);
        reset();

        if (newClient) {
          toast({
            variant: "confirmed",
            title: "Cliente editado ",
          });
        }
      });
    } else {
      startTransition(async () => {
        console.log("funcionou");
        console.log(values);

        const newClient = await createClient({
          name: values.name,
          group: groupSelect == ".@" ? "" : groupSelect,
          price: +values.price
            .split(" ")[1]
            .replaceAll(".", "")
            .replaceAll(",", "."),
          // price: +values.price,
          details: values.details,
          userId: userIdContext,
        });
        console.log(newClient);
        setCreateClientVisible(!createClientVisible);
        reset();
        if (newClient) {
          toast({
            variant: "confirmed",
            title: "Cliente criado ",
          });
        }
      });
    }
    setAttData(attData + 1);
  };

  const getInfos = async () => {
    console.log(userIdContext);
    const reponse = await listGroups({ id: userIdContext });
    console.log("res", reponse);

    setGroups(reponse as GroupProps[]);
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed  h-screen w-full top-0 left-0   opacity-2 z-40"
    >
      <div className="z-50 min-w-[350px] min-h-[500px] h-[80%] w-[70%] pt-10 px-10 fixed pt-8 px-1 pb-2 rounded-[5px] opacity-100 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[220px] ">
        <Title
          title="Criar cliente"
          subtitle="preencha as informações abaixo"
        />
        <form
          onSubmit={handleSubmit(handleCreateClientSubmit)}
          className="flex relative h-full mt-[20px] flex-col gap-[20px]"
        >
          <div>
            <label className="font-bold">nome:</label>

            <Input
              {...register("name")}
              type="string"
              placeholder="Ex: Anderson"
            />
          </div>

          <div>
            <label className="flex relative items-center gap-2 font-bold">
              grupo:
              <div
                onMouseEnter={() => {
                  setInfos(true);
                }}
                onMouseLeave={() => {
                  setInfos(false);
                }}
                className="rounded-full bg-[#DCDCDC] p-[0.5px] px-[6px] text-[12px]"
              >
                ?
              </div>
              <div
                className={`${
                  infos ? "" : "hidden"
                } absolute border shadow-lg p-3 bg-[#ffffff]  top-5 left-20 rounded font-normal text-[12px]`}
              >
                agrupo os clientes por algo em comum
              </div>
            </label>

            {/* <Input
              {...register("group")}
              type="string"
              placeholder="Ex: Area 2"
            /> */}

            <Select
              {...register("group")}
              onValueChange={(e) => {
                if (e == "add") {
                  console.log("adcionar");

                  setCreateGroupVisible(!createGroupVisible);
                  setSelected(true);
                  // criar um set com uma tela para criar um grupo
                }
                setGroupSelect(e);
                console.log(e);
              }}
            >
              <SelectTrigger className="">
                <SelectValue
                  className=""
                  placeholder={edit && group ? group : "nenhum"}
                />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup className="">
                  <SelectItem className="" value=".@">
                    {/* {edit ? group : "nenhum"} */}
                    nenhum
                  </SelectItem>
                  {groups.map((e, i) => {
                    return (
                      <SelectItem key={i} className="relative " value={e.name}>
                        {e.name}
                        {/* <Button
                          className="absolute -left-1 z-60"
                          onClick={() => {
                            console.log("cAAAAAAAlickou");
                          }}
                        >
                          a
                        </Button> */}
                      </SelectItem>
                    );
                  })}

                  <SelectItem className="" value="add">
                    + adicionar grupo
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* colocar mask */}
          <div>
            <label className="font-bold">valor:</label>
            <Input
              {...register("price")}
              type="string"
              placeholder="Ex: R$ 10,00"
            />
          </div>

          <div>
            <label className="font-bold">detalhes:</label>
            <Textarea
              {...register("details")}
              placeholder="Ex: Pix para devolução "
            />
          </div>

          <div className="absolute flex gap-1 bottom-24 right-0">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setCreateClientVisible(!createClientVisible);
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
