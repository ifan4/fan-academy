"use client"

import { convertDate, convertDateWithoutTime } from "@/lib/helper"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string,
    first_name: string,
    last_name: string,
    nisn: string,
    role: {
        id: string,
        name: 'admin' | 'user'
    },
    email: string
    email_verified_at: Date
    created_at: Date
    updated_at: Date
    date_of_birth: Date
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "first_name",
        header: "First Name",
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
    {
        accessorKey: "nisn",
        header: "NISN",
    },
    {
        accessorKey: "role.name",
        header: "Role",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            return convertDate(row.getValue("created_at"))
       
        },
    },
    {
        accessorKey: "date_of_birth",
        header: "Date of Birth",
        cell: ({ row }) => {
            if (row.getValue("date_of_birth")){
                return convertDateWithoutTime(row.getValue("date_of_birth"))
            }
            return <div className="text-red-300">Haven't filled out yet</div>
        },
    }
]
