"use client";

import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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
import { Dispatch, SetStateAction, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isPending: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  totalItems: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isPending,
  page,
  setPage,
  pageSize,
  totalItems,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

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
        pageIndex: page - 1,
        pageSize,
      },
    },
    state: {
      columnFilters,
      sorting,
    },
  });

  const handlePagePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    table.previousPage();
  };

  const handlePageNext = () => {
    setPage((prevPage) => prevPage + 1);
    table.nextPage();
  };

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-background">
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
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : Array.from({ length: isPending ? pageSize : 1 }).map(
                (_, index) => (
                  <TableRow key={index}>
                    <TableCell
                      colSpan={columns.length}
                      className="h-full text-center"
                    >
                      {isPending ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <p>No results.</p>
                      )}
                    </TableCell>
                  </TableRow>
                ),
              )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePagePrevious}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePageNext}
          disabled={(page - 1) * pageSize + data.length >= totalItems}
        >
          Next
        </Button>
      </div>
    </>
  );
}
