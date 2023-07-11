'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/react-hook-form/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import { Loader2,Trash } from "lucide-react";
import { fetcher, fetchers } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useSWR from "swr";
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

interface Props{
    category_id: string;
}

const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Class name must be at least 3 characters.'
    }),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters.'
    })
})

export default function DetailCategory({params}: {params: Props}){
    const {data:session} = useSession()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const { data:category, isLoading:isCategoryLoading, error } = useSWR(`/categories/detail/${params.category_id}`, fetcher)
    console.log(category);
    
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    useEffect(()=>{
        form.setValue('name',category?.data.name)
        form.setValue('description',category?.data.description)
    },[category])

    const onSubmit = async(values:z.infer<typeof formSchema>)=> {
        setIsLoading(true)
        try {
            const newCategory = await fetchers(`/categories/update/${params.category_id}`,{
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json', 
                    'Accept': 'application/json',
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user?.accessToken,
                },
                body: JSON.stringify(values)
            })

            return toast({
                title: 'Success',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-teal-700 p-4">
                        <p className="text-white">Category Successfully Updated!</p>
                    </pre>
                )
            })

            // return router.push(`/admin/categoryManagement`)
        } catch (error) {
            toast({
                title: 'Failed',
                variant: 'destructive',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md p-4">
                        <p>Failed to update category!</p>
                    </pre>
                )
            })
        } finally{
            setIsLoading(false)
        }
    }
    const deleteChapter = async()=> {
        try {
            await fetchers(`/categories/delete/${params.category_id}`,{
                method: 'DELETE',
                headers: {
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user?.accessToken,
                }
            })

            toast({
                title: 'Success',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-teal-700 p-4">
                        <p className="text-white">Category Successfully deleted!</p>
                    </pre>
                )
            })

            return router.push(`/admin/categoryManagement`)
        } catch (error) {
            return toast({
                title: 'Failed',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
                        <p className="text-white">Category Failed to delete!</p>
                    </pre>
                )
            })
        }
    }

    return(
        <>
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Category Detail</h1>
            
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                    size={'sm'} 
                    variant={'destructive'}>
                        <Trash className="mr-2 w-4 h-4"/>
                        Delete This Category
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this category and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    className="text-red-700"
                    onClick={deleteChapter} 
                    >
                        Continue Delete 
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div>
            <Form {...form}>
                <form 
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Category name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Category Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button 
                    type="submit"
                    >
                        {
                            isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        }
                        Update Category
                    </Button>
                </form>
            </Form>
        </>
    )
}