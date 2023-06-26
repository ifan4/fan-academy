"use client"

import { Button } from "@/components/ui/button"
import { convertDate, convertDateWithoutTime } from "@/lib/helper"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type quizScore = {
    id: string,
    materi: {
        title: string,
        class: {
            id: bigint,
            name: string
        } | undefined
    },  

    quiz: {
        id: bigint,
    },
    user: {
        id: bigint,
        email: string,
        fullname: string,
        nisn: string,
    },
    score: number,
}

export const columns: ColumnDef<quizScore>[] = [
    {
        accessorKey: "user.fullname",
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

            return (
                <div className=" flex-row">
                    <div>{row.original.user.email}</div>
                    <div className="text-xs">{row.getValue('user_fullname')}</div>
                </div>
            )
        },
    },
    {
        accessorKey: "quiz.id",
        header: 'Quiz ID'
    },
    {
        accessorKey: "score",
        header: "Score",
        cell: ({row})=> {
            const score:number = row.getValue('score') 
            return (
                <div 
                className={`${!score ? 'text-red-600' : 'text-teal-600'} font-extrabold`}
                >
                    {score}
                </div>
            )
        }
    },
    {
        accessorKey: "materi.title",
        header: "Materi",
    },
    {
        accessorKey: "materi.class.name",
        header: "Class",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            return convertDate(row.getValue("created_at"))
        },
    },
]
