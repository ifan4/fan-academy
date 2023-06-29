"use client"

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Dialog } from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"

import { createContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Class } from "./columns"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { fetchers } from "@/lib/fetchers"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    mutate: any
}

export interface alertClass {
    id: number | string | undefined,
    isOpen: boolean,
    setIsOpen: (isOpen:boolean) => void;
    setIdChoosed: (id: number | string) => void;
}


export const AlertDialogClassContext = createContext<alertClass | undefined>(undefined) 

export function ClassTable<TData, TValue>({
    columns,
    data,
    mutate
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const router = useRouter()

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [id, setIdChoosed] = useState<string|number|undefined>()
    const {data:session} = useSession()
    const { toast } = useToast()
    
    const deleteClass = async(id:string|number|undefined)=> {
    
        try {
            await fetchers(`/class/delete/${id}`,{
                method: 'DELETE',
                headers: {
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user.accessToken
                }
            })
            mutate()
            return toast({
                title: 'Success',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-teal-700 p-4">
                        <p className="text-white">a Class Successfully deleted!</p>
                    </pre>
                )
            })
        } catch (error) {
            return toast({
                title: 'Failed',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
                        <p className="text-white">a Class Failed to delete!</p>
                    </pre>
                )
            })
        }
    }

    return (
        <AlertDialogClassContext.Provider value={{ id, isOpen, setIsOpen,setIdChoosed }}>
            <div className="flex justify-between items-center py-4">
                <Input
                placeholder="Filter name..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
                <Button onClick={()=>router.push('/admin/classManagement/addClass')}>
                    Add Class
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
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
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                <AlertDialog
                    open={isOpen || false}
                    onOpenChange={(isOpen) => {
                        if (isOpen === true) return;
                        setIsOpen(false);
                    }}
                >
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this class 
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                        className="text-red-700"
                        onClick={()=>deleteClass(id)}
                        >
                            Continue Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AlertDialogClassContext.Provider>
    )
}
