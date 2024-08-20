"use client";

import {
  DeleteProductController,
  ListProductController,
} from "@/app/actions/product-actions";
import { getUserController } from "@/app/actions/user-actions";
import { Columns } from "@/app/utils/columns";
import { ConfirmAlert } from "@/components/ConfirmAlert";
import { CreateProduct } from "@/components/CreateProduct";
import { DataTable } from "@/components/DataTable";
import { Sidebar } from "@/components/Sidebar";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { SetContext } from "@/contexts/setContext";
import { getSession, signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

export default function Products() {
  const {
    sidebar,
    setSidebar,
    userIdContext,
    setUserIdContext,
    cancelVisible,
    setCancelVisible,
    createProductVisible,
    setCreateProductVisible,
    idConcluded,
    attData,
    setAttData,
    defProduct,
  } = useContext(SetContext);

  const [productsArr, setProductsArr] = useState([]);

  const columns = Columns({ type: "products" }) as [];

  // const getInfos = async () => {
  // const products = await ListProductController({})
  // };
  const getInfos = async () => {
    // setTypeTable("clients");
    // setAttData(attData + 1);
    const session = await getSession();
    if (session?.user?.email) {
      const userInfos = await getUserController({
        email: session.user.email,
      });
      if (userInfos) {
        console.log("userIDD", userInfos?.id);
        setUserIdContext(userInfos?.id);

        const data = await ListProductController({ id: userInfos?.id });
        console.log(data);
        setProductsArr(data as []);
      }
      // const data = await getUsers();
      console.log("UserIDDCli", userIdContext);
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  const toDeleteProduct = async () => {
    const deleteProduct = await DeleteProductController({ id: idConcluded });
    console.log(deleteProduct);
    setAttData(attData + 1);
  };

  return (
    // grid-cols-[1fr] small:grid-cols-[1fr_225px] medium:grid-cols-[1fr_345px]
    <main
      className="overflow-hidden relative
  
  h-screen px-[18px] medium:px-[52px] py-[20px] small:py-[64px] medium:gap-[46px] gap-[20px] grid   "
    >
      <Sidebar />
      <div className="flex max-h-[450px] h400:max-h-[500px] h500:max-h-[600px] h600:max-h-[650px] h700:max-h-[700px] h875:max-h-[800px]  flex-col">
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
          title="Tabela de produtos"
          subtitle="todos os produtos cadastrados"
        />
        <div className="h-full max-w-[75%] w430:max-w-[85%] w500:max-w-[100%]  mt-[10px]">
          <DataTable columns={columns} data={productsArr} />
        </div>
      </div>

      {cancelVisible ? (
        <ConfirmAlert
          type="cancel"
          visible={cancelVisible}
          cancel={setCancelVisible}
          toDo={toDeleteProduct}
          title="Deseja excluir"
          subtitle="o produto?"
        />
      ) : (
        ""
      )}

      {createProductVisible ? (
        <CreateProduct
          edit={true}
          id={defProduct.id}
          name={defProduct.name}
          price={defProduct.price}
          quantity={defProduct.quantity}
          details={defProduct.details}
          control={defProduct.control}
          // id={defClinet.id}
          // name={defClinet.name}
          // price={defClinet.price}
          // group={defClinet.group}
          // details={defClinet.details}
        />
      ) : (
        ""
      )}
    </main>
  );
}
