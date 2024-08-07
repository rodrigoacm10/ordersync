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
  userIdContext: "",
  setUserIdContext: (val: string) => {},
  attData: 0,
  setAttData: (val: number) => {},
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
  const [userIdContext, setUserIdContext] = useState("");
  const [attData, setAttData] = useState(0);

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
      }}
    >
      {children}
    </SetContext.Provider>
  );
}
