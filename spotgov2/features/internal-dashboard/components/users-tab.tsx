"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Copy, Edit, Trash2, MoreHorizontal, Mail } from 'lucide-react'

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

import { DataTable } from "./data-table"
import { User } from "@/database/schemas"
import AvatarIcon from "@/components/avatar-icon"

interface UsersTabProps {
  usersData: User[] | undefined
  isLoading: boolean
  isError: boolean
}

export function UsersTab({ usersData, isLoading, isError }: UsersTabProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [passwordRecoveryDialogOpen, setPasswordRecoveryDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const handleDeleteUser = () => {
    console.log("Deleting user:", currentUser?.id)
    setDeleteDialogOpen(false)
  }

  const handleSendPasswordRecovery = () => {
    console.log("Sending password recovery email to:", currentUser?.email)
    setPasswordRecoveryDialogOpen(false)
  }

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "email",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Email</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "avatarUrl",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Avatar URL</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => {
        const avatarUrl = row.getValue("avatarUrl") as string
        return avatarUrl ? (
          <img src={avatarUrl} alt="User avatar" className="w-8 h-8 rounded-full" />
        ) : (
          <AvatarIcon size={16} />
        )
      },
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
        const user = row.original

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
                <Copy className="mr-2 h-4 w-4" />
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit user
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setCurrentUser(user)
                setDeleteDialogOpen(true)
              }}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete user
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setCurrentUser(user)
                setPasswordRecoveryDialogOpen(true)
              }}>
                <Mail className="mr-2 h-4 w-4" />
                Password Recovery
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const initialColumnVisibility = {
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
    return <div className="text-center text-red-500 py-8">Failed to load users.</div>
  }

  return (
    <>
      <DataTable 
        columns={columns} 
        data={usersData || []} 
        initialColumnVisibility={initialColumnVisibility}
      />
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user
              and remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={passwordRecoveryDialogOpen} onOpenChange={setPasswordRecoveryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Password Recovery Email</DialogTitle>
            <DialogDescription>
              Are you sure you want to send a password recovery email to {currentUser?.email}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordRecoveryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendPasswordRecovery}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

