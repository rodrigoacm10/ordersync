import { SetContext } from "@/contexts/setContext";
import { useContext } from "react";
import { Button } from "./ui/button";
import { IoIosClose } from "react-icons/io";

import { RiFileList3Line } from "react-icons/ri";
import { AiOutlineInbox } from "react-icons/ai";
import { PiUserList } from "react-icons/pi";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const { sidebar, setSidebar } = useContext(SetContext);

  const router = useRouter();

  return (
    <div
      className={`${
        sidebar ? "" : "hidden"
      } absolute h-full w-[250px] p-2 shadow-xl bg-[#fff] z-10`}
    >
      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => {
            // console.log("gg");
            setSidebar(false);
          }}
        >
          <IoIosClose color="#828282" size={50} />
        </Button>
      </div>

      <div className="m-2 mt-14 ">
        <Button
          variant="ghost"
          className=" flex py-6 items-center gap-2 font-bold text-[16px] w-full justify-start"
          onClick={() => {
            router.push("/home");
            setSidebar(false);
          }}
        >
          <RiFileList3Line size={22} />
          PEDIDOS
        </Button>
        <Button
          variant="ghost"
          className=" flex py-6 items-center gap-2 font-bold text-[16px] w-full justify-start"
          onClick={() => {
            router.push("/products");
            setSidebar(false);
          }}
        >
          <AiOutlineInbox size={22} />
          PRODUTOS
        </Button>
        <Button
          variant="ghost"
          className=" flex py-6 items-center gap-2 font-bold text-[16px] w-full justify-start"
          onClick={() => {
            router.push("/clients");
            setSidebar(false);
          }}
        >
          <PiUserList size={22} />
          CLIENTES
        </Button>
      </div>
    </div>
  );
}
