"use client";

import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
import { Loader } from "lucide-react";
import { useState } from "react";
import { mapUserRolesToPortuguese, UserRoles } from "@/types";
import { cn } from "@/utils/utils";
import InviteUserButton from "./invite-user-button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isPending: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isPending,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRole, setSelectedRole] = useState<string>("todos");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      columnFilters,
      sorting,
    },
  });

  const handleSelectedRole = (role: string) => {
    setSelectedRole(role);

    if (role === "todos") {
      table.getColumn("role")?.setFilterValue(undefined);
    } else {
      table.getColumn("role")?.setFilterValue(role);
    }
  };

  const userRolesWithTodos = ["todos", ...Object.values(UserRoles)];

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="bg-accent/20 flex w-fit items-center rounded-lg p-1">
          {userRolesWithTodos.map((role) => (
            <div
              key={role}
              className={cn(
                "cursor-pointer rounded-md p-2",
                selectedRole === role && "bg-background",
              )}
              onClick={() => handleSelectedRole(role)}
            >
              <p className="text-sm">
                {
                  mapUserRolesToPortuguese[
                    role as keyof typeof mapUserRolesToPortuguese
                  ]
                }
              </p>
            </div>
          ))}
        </div>
        <InviteUserButton />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Loader className="mx-auto animate-spin" />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={isPending || !table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={isPending || !table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
