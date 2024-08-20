"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  //   getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useContext, useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { SetContext } from "@/contexts/setContext";
import { listGroups } from "@/app/actions/group-actions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  CommandInput,
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";

interface GroupProps {
  id: string;
  name: string;
  userId: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const {
    attData,
    userIdContext,
    setUserIdContext,
    typeTable,
    setTypeTable,
    groupArr,
    setGroupArr,
  } = useContext(SetContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // const getInfos = async () => {
  //   if (typeTable == "clients") {
  //     console.log("userId data", userIdContext);
  //     const groups = await listGroups({ id: userIdContext });
  //     setGroupsArr([
  //       {
  //         id: "",
  //         userId: userIdContext,
  //         name: "",
  //       },
  //       ...groups,
  //     ] as GroupProps[]);
  //   }
  // };

  // useEffect(() => {
  //   getInfos();
  // }, []);

  // useEffect(() => {
  //   getInfos();
  // }, [attData]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // // getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center">
          <div className=" flex gap-1 items-center py-4">
            <Input
              placeholder="Procurar nome"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              // max-w-sm
              className=" max-w-[150px]"
            />

            {typeTable == "clients" ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[150px] justify-between"
                  >
                    {/* {value
                   ? clientsArr.find((framework) => framework.id === value)
                       ?.name
                   : "Encontre o cliente"} */}
                    {value
                      ? groupArr.find((framework) => framework.name === value)
                          ?.name
                      : "Procurar grupo"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0">
                  <Command className="">
                    <CommandInput placeholder="Procurar grupo" />
                    <CommandList>
                      <CommandEmpty>Nenhum grupo encontrado</CommandEmpty>
                      <CommandGroup>
                        {/* <CommandItem
                          className="w-[150px]"
                          key="1"
                          value=""
                          onSelect={(currentValue: any) => {
                            console.log(currentValue);
                            // const selectCli = groupArr.find(
                            //   (cli) => cli.name == currentValue
                            // );
                            // console.log(selectCli);
                            // setCurClient(selectCli as Clients);

                            table
                              .getColumn("group")
                              ?.setFilterValue(currentValue);

                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4"
                              // value === framework.id
                              //   ? "opacity-100"
                              //   : "opacity-0"
                            )}
                          />
                          nenhum
                        </CommandItem> */}

                        {groupArr.map((framework) => (
                          <CommandItem
                            className="w-[150px]"
                            key={framework.id}
                            value={framework.name}
                            onSelect={(currentValue: any) => {
                              console.log(currentValue);
                              const selectCli = groupArr.find(
                                (cli) => cli.name == currentValue
                              );
                              console.log(selectCli);
                              // setCurClient(selectCli as Clients);

                              table
                                .getColumn("group")
                                ?.setFilterValue(currentValue);

                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.name == "" ? "nenhum" : framework.name}
                            {/* {framework.name} */}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              ""
            )}
          </div>
          {/* exlcuir determinadas colunas da visualização */}
          {/* 
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Colunas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </div>
        {/* min-h-[700px] */}
        {/* <div className="rounded-md border  "> */}

        {/* w-[200px] */}
        <ScrollArea className="max-h-[200px] h400:max-h-[250px] h500:max-h-[350px] h600:max-h-[400px] h700:max-h-[450px] h875:max-h-[550px] rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 bg-secondary">
              {/* <TableHeader> */}
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        // style={{
                        // minWidth: header.column.columnDef.size,
                        // maxWidth: header.column.columnDef.size,
                        // }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            {/* <div className="bg-black max-h-[200px]"> */}
            <TableBody className="h-[200px]    overflow-scroll ">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        // style={{
                        // minWidth: cell.column.columnDef.size,
                        // maxWidth: cell.column.columnDef.size,
                        // }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {/* </div> */}
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* </div> */}

      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </>
  );
}
