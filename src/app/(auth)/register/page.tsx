"use client";

import { registerAction } from "@/app/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Register() {
  const formMethods = useForm({
    // defaultValues: {
    //   costValue: "0",
    //   profitMargin: "0",
    //   saleValue: "0",
    // },
    // resolver: checkoutLoginSchema,
  });

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
            placeholder="Ex: R$ 10,00"
          />
        </div>

        <div>
          <label className="text-[12px] font-bold">E-mail</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="Ex: R$ 10,00"
          />
        </div>

        <div>
          <label className="text-[12px] font-bold">senha</label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Ex: R$ 10,00"
          />
        </div>

        <div>
          <label className="text-[12px] font-bold">confirmar enha</label>
          <Input
            {...register("passwordConfim")}
            type="password"
            placeholder="Ex: R$ 10,00"
          />
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
