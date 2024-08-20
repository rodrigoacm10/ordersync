"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { SetContext } from "@/contexts/setContext";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  lastSeen: string;
};

export type Clients = {
  id: string;
  name: string;
  group: string;
  price: number;
  details: string;
};

export type Products = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  control: boolean;
};

// interface CreateProductProps {
//   name: string;
//   price: number;
//   details: string;
//   userId: string;
//   quantity: number;
// }

export const Columns = ({ type }: { type: "clients" | "products" }) => {
  const {
    cancelVisible,
    setCancelVisible,
    idConcluded,
    setIdConcluded,
    editPriceClient,
    setEditPiceClient,
    editFullClient,
    setEditFullClient,
    defClinet,
    setDefClient,
    createClientVisible,
    setCreateClientVisible,
    defProduct,
    setDefProduct,
    createProductVisible,
    setCreateProductVisible,
  } = useContext(SetContext);

  if (type == "clients") {
    const columns: ColumnDef<Clients>[] = [
      {
        accessorKey: "name",
        // size: 250,
        // cell: ({ row }) => {
        //   console.log(row.original.name);
        //   return <div className="w-[1000px]">{row.original.name}</div>;
        // },
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "group",
        header: "Grupo",
        cell: ({ row }) => {
          // const date = new Date(row.getValue("lastSeen"));
          // const formatted = date.toLocaleDateString();
          return (
            <div className="">
              {row.getValue("group") ? row.getValue("group") : "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Valor",
        cell: ({ row }) => {
          return <div>R$ {row.original.price},00</div>;
        },
      },
      {
        accessorKey: "details",
        header: "Detalhes",
        // cell: ({ row }) => {
        //   const date = new Date(row.getValue("lastSeen"));
        //   const formatted = date.toLocaleDateString();
        //   return <div className="font-medium">{formatted}</div>;
        // },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  Copy user ID
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    console.log(user.id);
                    setIdConcluded(user.id);
                    setCancelVisible(!cancelVisible);
                    console.log("eclui");
                  }}
                  className="text-[red]"
                >
                  excluir
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(user.id);
                    setIdConcluded(user.id);
                    setDefClient({
                      id: user.id,
                      name: user.name,
                      price: user.price,
                      details: user.details,
                      group: user.group,
                    });
                    setEditPiceClient(!editPriceClient);
                    console.log("eclui");
                  }}
                >
                  alterar valor
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(user.id);
                    setIdConcluded(user.id);
                    setDefClient({
                      id: user.id,
                      name: user.name,
                      price: user.price,
                      details: user.details,
                      group: user.group,
                    });
                    setCreateClientVisible(!createClientVisible);
                    console.log("eclui");
                  }}
                >
                  editar cliente
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];

    return columns;
  } else {
    const columns: ColumnDef<Products>[] = [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Preço",
      },
      {
        accessorKey: "quantity",
        header: "Quantidade",
      },
      {
        accessorKey: "details",
        header: "Detalhes",
      },
      // {
      //   accessorKey: "lastSeen",
      //   header: "Last Seen",
      //   cell: ({ row }) => {
      //     const date = new Date(row.getValue("lastSeen"));
      //     const formatted = date.toLocaleDateString();
      //     return <div className="font-medium">{formatted}</div>;
      //   },
      // },
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  Copy user ID
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    console.log(user.id);
                    setIdConcluded(user.id);
                    setCancelVisible(!cancelVisible);
                    console.log("eclui");
                  }}
                  className="text-[red]"
                >
                  excluir
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(user.id);
                    setIdConcluded(user.id);
                    console.log({
                      id: user.id,
                      name: user.name,
                      price: user.price,
                      details: user.details,
                      quantity: user.quantity,
                    });
                    setDefProduct({
                      id: user.id,
                      name: user.name,
                      price: user.price,
                      details: user.details,
                      quantity: user.quantity,
                      control: user.control,
                    });
                    // setDefClient({
                    //   id: user.id,
                    //   name: user.name,
                    //   price: user.price,
                    //   details: user.details,
                    //   group: user.group,
                    // });
                    // setCreateClientVisible(!createClientVisible);

                    setCreateProductVisible(!createProductVisible);
                    console.log("eclui");
                  }}
                >
                  editar produto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];

    return columns;
  }
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "lastSeen",
    header: "Last Seen",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastSeen"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
