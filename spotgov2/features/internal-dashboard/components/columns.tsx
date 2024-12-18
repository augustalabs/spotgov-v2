// File: spotgov2/features/internal-dashboard/components/columns.tsx
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

export const orgColumns: ColumnDef<any, any>[] = [
  { 
    accessorKey: 'name', 
    header: 'Name',
    size: 200,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Link 
          href={`/internal/organization/${id}`}
          className="text-primary hover:underline"
        >
          {row.original.name}
        </Link>
      )
    }
  },
  { 
    accessorKey: 'deepDiveCurrency', 
    header: 'Deep Dive Credits',
    size: 150,
  },
  { 
    accessorKey: 'matchmakingCurrency', 
    header: 'Matchmaking Credits',
    size: 150,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    size: 120,
    cell: ({ cell }) => {
      const date = new Date(cell.getValue() as string)
      return format(date, 'dd-MM-yyyy')
    },
  },
]

export const userColumns: ColumnDef<any, any>[] = [
  { 
    accessorKey: 'name', 
    header: 'Name',
    size: 200,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Link 
          href={`/internal/user/${id}`}
          className="text-primary hover:underline"
        >
          {row.original.name}
        </Link>
      )
    }
  },
  { 
    accessorKey: 'email', 
    header: 'Email',
    size: 250,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    size: 120,
    cell: ({ cell }) => {
      const date = new Date(cell.getValue() as string)
      return format(date, 'dd-MM-yyyy')
    },
  },
]