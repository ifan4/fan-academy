"use client"

import { Button } from "@/components/ui/button"
import { convertDate, convertDateWithoutTime } from "@/lib/helper"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import Link from "next/link"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Role= {
    id: string,
    name: string,
    description: string,
    created_at: Date
    updated_at: Date
    deleted_at: Date
}

export const columns: ColumnDef<Role>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return(
                <Link href={`/admin/categoryManagement/detail/${row.original.id}`} >
                    <Button variant={'link'} className="text-start">
                        {row.getValue("name")}
                    </Button>
                </Link>
            )
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            return convertDate(row.getValue("created_at"))
        },
    },
    {
        accessorKey: "updated_at",
        header: "Updated at",
        cell: ({ row }) => {

            return row.getValue("updated_at") ? convertDate(row.getValue("updated_at")) : 'Not Updated'
        },
    },
]
