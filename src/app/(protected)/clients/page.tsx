"use client";

import { getSession } from "@/app/actions/auth-action";
import {
  createClient,
  deleteClient,
  listClients,
} from "@/app/actions/client-actions";
import { listGroups } from "@/app/actions/group-actions";
import { getUserController } from "@/app/actions/user-actions";
import { Columns } from "@/app/utils/columns";
import { ConfirmAlert } from "@/components/ConfirmAlert";
import { CreateClient } from "@/components/CreateClient";
import { CreateGroup } from "@/components/CreateGroup";
import { DataTable } from "@/components/DataTable";
import { EditPriceClientCont } from "@/components/EditPriceClient";
import { Sidebar } from "@/components/Sidebar";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SetContext } from "@/contexts/setContext";
import { signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";

// deletar dps
type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  lastSeen: string;
};

interface GroupProps {
  id: string;
  name: string;
  userId: string;
}

// async function getUsers(): Promise<User[]> {
//   const res = await fetch(
//     "https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users"
//   );

//   const data = await res.json();

//   console.log(data);

//   return data;
// }

export default function Clients() {
  const { toast } = useToast();

  const [clientsArr, setClientsArr] = useState([]);

  const {
    cancelVisible,
    setCancelVisible,
    sidebar,
    setSidebar,
    createVisible,
    setCreateVisible,
    userIdContext,
    setUserIdContext,
    typeTable,
    setTypeTable,
    setAttData,
    attData,
    groupArr,
    setGroupArr,
    idConcluded,
    editPriceClient,
    setEditPiceClient,
    editFullClient,
    setEditFullClient,
    defClinet,
    createClientVisible,
    createGroupVisible,
  } = useContext(SetContext);

  const toDeleteClient = async () => {
    const deletedClient = await deleteClient({ id: idConcluded });
    console.log(deletedClient);
    setAttData(attData + 1);
    setCancelVisible(!cancelVisible);

    toast({
      variant: "confirmed",
      title: "Cliente excluído ",
    });
  };

  const getInfos = async () => {
    setTypeTable("clients");
    // setAttData(attData + 1);
    const session = await getSession();
    if (session?.user?.email) {
      const userInfos = await getUserController({
        email: session.user.email,
      });
      if (userInfos) {
        console.log("userIDD", userInfos?.id);
        setUserIdContext(userInfos?.id);

        // const cre = await createClient({
        //   name: "testCli2",
        //   group: "fafas",
        //   price: 100,
        //   details: "aa",
        //   userId: userIdContext,
        // });
        // console.log(cre);

        const data = await listClients({ id: userInfos?.id });
        console.log(data);
        setClientsArr(data as []);
        const groups = await listGroups({ id: userInfos?.id });
        console.log("grupos", groups);
        console.log("oq vai ser enviado", [
          {
            id: "",
            userId: userIdContext,
            name: "",
          },
          ...groups,
        ]);
        setGroupArr([
          {
            id: "",
            userId: userIdContext,
            name: "",
          },
          ...groups,
        ] as GroupProps[]);
      }
    }
    // const data = await getUsers();
    console.log("UserIDDCli", userIdContext);
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  const columns = Columns({ type: "clients" }) as [];

  return (
    // grid-cols-[1fr] small:grid-cols-[1fr_225px] medium:grid-cols-[1fr_345px] overflow-hidden
    <main
      className="  relative overflow-hidden
  
  h-screen px-[18px] medium:px-[52px] py-[20px] small:py-[64px] medium:gap-[46px] gap-[20px] grid   "
    >
      <Sidebar />
      <div
        className="flex 
      
      max-h-[450px] h400:max-h-[500px] h500:max-h-[600px] h600:max-h-[650px] h700:max-h-[700px] h875:max-h-[800px]  flex-col"
      >
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
          title="Tabela de clientes"
          subtitle="todos os clientes cadastrados"
        />
        {/* 
        <div className="flex justify-between mt-[10px]">
          <div></div>
          <Button
            onClick={() => setCreateVisible(!createVisible)}
            className="text-[12px]  medium:text-[16px]"
          >
            <TiPlus size={18} className="hidden small:block" /> CLIENTE
          </Button>
        </div> */}
        {/* max-h-[200px] h400:max-h-[250px] h500:max-h-[350px] h600:max-h-[400px] h700:max-h-[450px] h875:max-h-[550px] */}

        <div className="h-full max-w-[75%] w430:max-w-[85%] w500:max-w-[100%]  mt-[10px]">
          <DataTable columns={columns} data={clientsArr} />
        </div>
      </div>

      {cancelVisible ? (
        <ConfirmAlert
          type="cancel"
          visible={cancelVisible}
          cancel={setCancelVisible}
          toDo={toDeleteClient}
          title="Deseja excluir"
          subtitle="o cliente?"
        />
      ) : (
        ""
      )}

      {editPriceClient ? (
        <EditPriceClientCont defaultPrice={defClinet.price} />
      ) : (
        ""
      )}

      {createClientVisible ? (
        <CreateClient
          edit={true}
          id={defClinet.id}
          name={defClinet.name}
          price={defClinet.price}
          group={defClinet.group}
          details={defClinet.details}
        />
      ) : (
        ""
      )}

      {createGroupVisible ? <CreateGroup /> : ""}
    </main>
  );
}
