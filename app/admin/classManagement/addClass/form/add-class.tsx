'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/react-hook-form/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchers } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    name: z.string().min(10, {
        message: 'Class name must be at least 10 characters.'
    }),
    description: z.string().min(50, {
        message: 'Description must be at least 50 characters.'
    })
})

export default function AddClassForm(){
    const {data:session} = useSession()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async(values:z.infer<typeof formSchema>)=> {
        setIsLoading(true)
        try {
            const newClass = await fetchers('/class/add',{
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json', 
                    'Accept': 'application/json',
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user?.accessToken,
                },
                body: JSON.stringify(values)
            })
            console.log('newClass');
            console.log(newClass);
            
            

            toast({
                title: 'Success',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-teal-700 p-4">
                        <p className="text-white">Class Successfully Added!</p>
                    </pre>
                )
            })

            return router.push(`/admin/classManagement/${newClass.data.id}`)
        } catch (error) {
            
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
                    >
                        {
                            isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        }
                        Add Class
                    </Button>
                </form>
            </Form>
        </>
    )
}