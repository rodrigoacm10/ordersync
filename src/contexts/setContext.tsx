"use client";

import { createContext, ReactNode, useState } from "react";

interface setContextProps {
  children: ReactNode;
}

interface AddProductListProps {
  quantity: number;
  productId: string;
  productName: string;
  // product: "sla",
  value: number;
}

interface GroupProps {
  id: string;
  name: string;
  userId: string;
}

interface ClientProps {
  id: string;
  name: string;
  // userId: string;
  group: string;
  price: number;
  details: string;
}

interface CreateProductProps {
  id: string;
  name: string;
  price: number;
  details: string;
  quantity: number;
  control: boolean;
}

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
  description: string | null;
  orderItems: OrderItemProps[];
  clientRegis: boolean;
  id: string;
  value: number;
  timeStart: bigint | number;
  timeConcluded: bigint | number | null;
}

export const SetContext = createContext({
  cancelVisible: false,
  setCancelVisible: (val: boolean) => {},
  concludedConfirm: false,
  setConcludedConfirm: (val: boolean) => {},
  idConcluded: "idteste" as string,
  setIdConcluded: (val: string) => {},
  createVisible: false,
  setCreateVisible: (val: boolean) => {},
  addProduct: false,
  setAddProduct: (val: boolean) => {},
  addProductList: [{ quantity: 0, productId: "", productName: "", value: 0 }],
  setAddProductList: (val: AddProductListProps[]) => {},
  createProductVisible: false,
  setCreateProductVisible: (val: boolean) => {},
  createClientVisible: false,
  setCreateClientVisible: (val: boolean) => {},
  userIdContext: "",
  setUserIdContext: (val: string) => {},
  attData: 0,
  setAttData: (val: number) => {},
  sidebar: false,
  setSidebar: (val: boolean) => {},
  createGroupVisible: false,
  setCreateGroupVisible: (val: boolean) => {},
  cliRegis: false,
  setCliRegis: (val: boolean) => {},
  typeTable: "",
  setTypeTable: (val: "" | "clients" | "products") => {},
  groupArr: [] as GroupProps[],
  setGroupArr: (val: GroupProps[]) => {},
  editPriceClient: false,
  setEditPiceClient: (val: boolean) => {},
  editFullClient: false,
  setEditFullClient: (val: boolean) => {},
  defClinet: {} as ClientProps,
  setDefClient: (val: ClientProps) => {},
  defProduct: {} as CreateProductProps,
  setDefProduct: (val: CreateProductProps) => {},
  isReg: false,
  setIsReg: (val: boolean) => {},
  defOrder: {} as OrderProps,
  setDefOrder: (val: OrderProps) => {},
});

export function SetContextProvider({ children }: setContextProps) {
  const [cancelVisible, setCancelVisible] = useState(false);
  const [concludedConfirm, setConcludedConfirm] = useState(false);
  const [idConcluded, setIdConcluded] = useState("idteste");
  const [createVisible, setCreateVisible] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [addProductList, setAddProductList] = useState([
    {
      quantity: 0,
      productId: "",
      productName: "",
      value: 0,
    },
  ]);
  const [createProductVisible, setCreateProductVisible] = useState(false);
  const [createClientVisible, setCreateClientVisible] = useState(false);
  const [createGroupVisible, setCreateGroupVisible] = useState(false);
  const [userIdContext, setUserIdContext] = useState("");
  const [attData, setAttData] = useState(0);
  const [sidebar, setSidebar] = useState(false);
  const [cliRegis, setCliRegis] = useState(false);
  const [typeTable, setTypeTable] = useState("");
  const [groupArr, setGroupArr] = useState([] as GroupProps[]);
  const [editPriceClient, setEditPiceClient] = useState(false);
  const [editFullClient, setEditFullClient] = useState(false);
  const [defClinet, setDefClient] = useState({} as ClientProps);
  const [defProduct, setDefProduct] = useState({} as CreateProductProps);
  const [isReg, setIsReg] = useState(false);
  const [defOrder, setDefOrder] = useState<OrderProps>({} as OrderProps);

  return (
    <SetContext.Provider
      value={{
        cancelVisible,
        setCancelVisible,
        concludedConfirm,
        setConcludedConfirm,
        idConcluded,
        setIdConcluded,
        createVisible,
        setCreateVisible,
        addProduct,
        setAddProduct,
        addProductList,
        setAddProductList,
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
        cliRegis,
        setCliRegis,
        typeTable,
        setTypeTable,
        groupArr,
        setGroupArr,
        editPriceClient,
        setEditPiceClient,
        editFullClient,
        setEditFullClient,
        defClinet,
        setDefClient,
        defProduct,
        setDefProduct,
        isReg,
        setIsReg,
        defOrder,
        setDefOrder,
      }}
    >
      {children}
    </SetContext.Provider>
  );
}
