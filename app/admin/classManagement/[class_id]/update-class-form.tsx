'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/react-hook-form/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { fetcher, fetchers } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { category } from "@/types/interfaces";

const formSchema = z.object({
    name: z.string().min(10, {
        message: 'Class name must be at least 10 characters.'
    }),
    description: z.string().min(50, {
        message: 'Description must be at least 50 characters.'
    }),
    category_id: z.string({
        required_error: 'Please select a category.'
    })
})

export default function UpdateClassForm({class_id}:{class_id: string}){
    const {data:session} = useSession()
    const {data:categories, isLoading:isCategoriesLoading, error:categoriesError} = useSWR('/categories', fetcher)
    const {data, isLoading:isDataLoading, error} = useSWR(`/class/${class_id}`, fetcher)
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    useEffect(()=>{
        form.setValue('name',data?.data.name)
        form.setValue('description',data?.data.description)
        form.setValue('category_id',data?.data.category.id.toString())
        console.log(form.getValues());
        
    },[data])

    const onSubmit = async(values:z.infer<typeof formSchema>)=> {
        setIsLoading(true)
        try {
            await fetchers(`/class/update/${class_id}`,{
                method: 'PATCH',
                headers: {
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user?.accessToken,
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    description: values.description,
                    category_id: parseInt(values.category_id)
                })
            })

            return toast({
                title: 'Success',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-teal-700 p-4">
                        <p className="text-white">Class Successfully Updated!</p>
                    </pre>
                )
            })
        } catch (error) {
            return toast({
                variant: 'destructive',
                title: 'Failed',
                description: (
                    <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <p className="text-white">Failed to update class!</p>
                    </div>
                )
            })
        } finally{
            setIsLoading(false)
        }
    }

    return(
        <>
            <Form {...form}>
                <form 
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        >
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category"/>
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {
                                    categories && categories?.data.map((category:category,key:number)=>(
                                            <SelectItem
                                            key={key} 
                                            value={category.id.toString()}
                                            
                                            >
                                                {category.name}
                                            </SelectItem>
                                        )
                                    )
                                }
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Class Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Class name" {...field} />
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
                            <FormLabel>Class Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button 
                    type="submit"
                    variant={'outline'}
                    size={'sm'}
                    >
                        {
                            isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        }
                        Update Class
                    </Button>
                </form>
            </Form>
        </>
    )
}