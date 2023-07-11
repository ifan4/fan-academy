"use client"

import { convertDate, textTrunc } from "@/lib/helper"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useContext, useState } from "react"
import { AlertDialogClassContext } from "./class-table"
import { class_type } from "@/types/interfaces"


export const columns: ColumnDef<class_type>[] = [
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
            )
        },
        cell: ({ row }) => {
            return textTrunc(row.getValue('name'), 30)
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return <div className="truncate w-48">{row.getValue("description")}</div>
        },
    },
    {
        accessorKey: "category.name",
        header: "Category",
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Published At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return convertDate(row.getValue("created_at"))
        },
    },
    {
        id: "actions",
        cell: function Cell({row}){
            const Context = useContext(AlertDialogClassContext)
            const Class = row.original
            
            return (
                <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    className="text-red-700"
                    onClick={()=>{
                        Context?.setIsOpen(true)
                        Context?.setIdChoosed(Class.id)
                        
                    }}
                    // onClick={() => navigator.clipboard.writeText(Class.id)}
                    >
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View students</DropdownMenuItem>
                    <Link href={`/admin/classManagement/${Class.id}`}>
                        <DropdownMenuItem>
                            View Class details
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
]
