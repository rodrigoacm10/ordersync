"use client";

import { registerAction } from "@/app/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function Register() {
  const router = useRouter();

  const checkoutLoginSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      email: yup.string().required("inserir campo"),
      password: yup
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .required("inserir campo"),
      passwordConfim: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas devem ser iguais")
        .required("inserir campo"),
    })
  );

  const formMethods = useForm({
    // defaultValues: {
    //   costValue: "0",
    //   profitMargin: "0",
    //   saleValue: "0",
    // },
    resolver: checkoutLoginSchema,
  });

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = formMethods;

  const handleRegister = async (values: any) => {
    const register = await registerAction(values);
    console.log(register);

    setError(null);
    startTransition(async () => {
      const response = await registerAction(values);
      console.log(response); // setTab
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/home");
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center w-full ">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="px-[20px] py-[30px] border border-[#DCDCDC] border-[1px] rounded-[5px] "
      >
        <h1 className="font-bold text-center text-2xl mb-[20px]">
          Criar conta
        </h1>

        <div>
          <label className="text-[12px] font-bold">nome</label>
          <Input
            {...register("name")}
            type="string"
            placeholder="nome do usuário"
          />
        </div>

        <div>
          <label className="text-[12px] font-bold">E-mail</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="exemplo@gmail.com"
          />{" "}
          {error && error == "user already exists" ? (
            <span className="text-[12px] text-[red]">
              {" "}
              *Email já cadastrado
            </span>
          ) : (
            ""
          )}
        </div>

        <div>
          <label className="text-[12px] font-bold">senha</label>
          <Input
            {...register("password")}
            type="password"
            placeholder="crie sua senha"
          />
          {errors.password ? (
            <span className="text-[12px] text-[red]">
              {" "}
              *A senha deve ter pelo menos 8 caracters
            </span>
          ) : (
            ""
          )}
        </div>

        <div>
          <label className="text-[12px] font-bold">confirmar enha</label>
          <Input
            {...register("passwordConfim")}
            type="password"
            placeholder="confirme sua senha"
          />
          {errors.passwordConfim ? (
            <span className="text-[12px] text-[red]">
              {" "}
              *As senhas devem ser iguais
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="h-[1px] w-full bg-[#DCDCDC] mt-2 mb-2"></div>

        <Button type="submit" className="w-full">
          Criar
        </Button>

        <div className="mt-8 text-[14px] underline flex justify-between">
          <Link href="/">voltar</Link>
          <Link href="/login">possuo conta</Link>
        </div>
      </form>
    </main>
  );
}
