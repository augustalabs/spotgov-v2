"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Copy, Edit, Trash2, MoreHorizontal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { DataTable } from "@/features/internal-dashboard/components/data-table"
import { Organization } from "@/database/schemas"

interface OrganizationsTabProps {
  orgsData: Organization[] | undefined
  isLoading: boolean
  isError: boolean
}

export function OrganizationsTab({ orgsData, isLoading, isError }: OrganizationsTabProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null)

  const handleDeleteOrg = () => {
    console.log("Deleting organization:", currentOrg?.id)
    setDeleteDialogOpen(false)
  }

  const handleEditOrg = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Editing organization:", currentOrg)
    setEditDialogOpen(false)
  }

  const columns: ColumnDef<Organization>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Name</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "nif",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>NIF</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "deepDiveCurrency",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Deep Dive Currency</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "matchmakingCurrency",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Matchmaking Currency</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Created At</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string
        return <div>{new Date(date).toLocaleString()}</div>
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Updated At</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => {
        const date = row.getValue("updatedAt") as string
        return <div>{new Date(date).toLocaleString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const org = row.original

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
                onClick={() => navigator.clipboard.writeText(org.id)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy organization ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                setCurrentOrg(org)
                setEditDialogOpen(true)
              }}>
                <Edit className="mr-2 h-4 w-4" />
                Edit organization
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setCurrentOrg(org)
                setDeleteDialogOpen(true)
              }}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const initialColumnVisibility = {
    nif: false,
    updatedAt: false,
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isError) {
    return <div className="text-center text-red-500 py-8">Failed to load organizations.</div>
  }

  return (
    <>
      <DataTable 
        columns={columns} 
        data={orgsData || []} 
        initialColumnVisibility={initialColumnVisibility}
      />
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this organization?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the organization
              and remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteOrg}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditOrg}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={currentOrg?.name}
                  onChange={(e) => setCurrentOrg(prev => ({ ...prev!, name: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nif" className="text-right">
                  NIF
                </Label>
                <Input
                  id="nif"
                  value={currentOrg?.nif || ""}
                  onChange={(e) => setCurrentOrg(prev => ({ ...prev!, nif: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deepDiveCurrency" className="text-right">
                  Deep Dive Currency
                </Label>
                <Input
                  id="deepDiveCurrency"
                  type="number"
                  value={currentOrg?.deepDiveCurrency || 0}
                  onChange={(e) => setCurrentOrg(prev => ({ ...prev!, deepDiveCurrency: parseInt(e.target.value) }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="matchmakingCurrency" className="text-right">
                  Matchmaking Currency
                </Label>
                <Input
                  id="matchmakingCurrency"
                  type="number"
                  value={currentOrg?.matchmakingCurrency || 0}
                  onChange={(e) => setCurrentOrg(prev => ({ ...prev!, matchmakingCurrency: parseInt(e.target.value) }))}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

