'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/react-hook-form/form";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { EventHandler, useEffect, useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import useSWR from "swr";
import { fetcher, fetcherFile, fetcherWithToken, fetchers } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { materi, quiz } from "@/types/interfaces";
import { isBreakOrContinueStatement } from "typescript";
import { useRouter } from "next/navigation";

interface Props{
    class_id: string;
    materi_id: string;
}


const formSchema = z.object({
    title: z.string().min(10, {
        message: 'Title must be at least 10 characters.'
    }),
    description:z.string().min(20, {
        message: 'Description must be at least 50 characters.'
    }),
    file:  z.any(),
    video:z.string()
})
type formDefaultValues = z.infer<typeof formSchema>



export default function MateriForm(
    {params,materi}: {params:Props,materi:materi}
)
{
    const { toast } = useToast()
    const {data:session} = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFileLoading, setIsFileLoading] = useState<boolean>(false)
    
    const form = useForm<formDefaultValues>({
        resolver: zodResolver(formSchema)
    })
    const { fields, append,remove } = useFieldArray({
        name: "quizzes",
        control: form.control,
    })

    useEffect(()=>{
        form.setValue('title',materi?.title)
        form.setValue('description',materi?.description)
        // form.setValue('file',data?.data.file)
        form.setValue('video',materi?.video_materi)
        console.log(materi);
    },[materi])

    const onDownload = async()=>{
        setIsFileLoading(true)
        try {
            //@ts-ignore
            return await fetcherFile(`/materi/download/${materi.file_materi}`,session?.user?.accessToken)
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsFileLoading(false)
        }
    }


    const onSubmit = async(values:z.infer<typeof formSchema>)=> {
        setIsLoading(true)
        
        const formData = new FormData()
        formData.append('class_id', params.class_id)
        formData.append('title', values.title)
        formData.append('description', values.description)
        if (values.file){
            formData.append('file', values.file[0])
        }
        formData.append('video_materi', values.video)
        formData.append('_method', 'PATCH')
        console.log(formData);

        try {
            await fetchers(`/materi/update/${params.materi_id}`,{
                method: "POST",
                headers: {
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user?.accessToken,
                },
                body: formData
            })

            return toast({
                title: 'Success',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-teal-800 p-4">
                        <p className="text-white">Materi Successfully Updated!</p>
                    </pre>
                )
            })
        } catch (error) {
            return toast({
                variant: 'destructive',
                title: 'Failed',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md p-4">
                        <p className="text-white">Update data failed!</p>
                    </pre>
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
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="video"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Youtube Video</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="Input Youtube Link Here" {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="file"
                    render={({field: { value, onChange, ...fieldProps }}) => (
                        <FormItem>
                            <div className="flex justify-between items-baseline">
                                <FormLabel>Upload New Chapter File</FormLabel>
                                <Button 
                                type={'button'}
                                variant={'link'}
                                size={'sm'}
                                onClick={()=>onDownload()}
                                >
                                    {
                                    !isFileLoading 
                                    ? <>
                                        <Eye className="mr-2 h-4 w-4"/>
                                        </>
                                    : <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    }
                                    <div>See current materi</div>
                                </Button>
                            </div>
                            <FormControl>
                                <Input 
                                type="file" 
                                placeholder="Upload New Chapter File here" 
                                onChange={(event:any) => onChange(event.target.files)}
                                {...fieldProps} 
                                />
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
                            <FormLabel>Chapter Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                   
                    <Button
                    variant={'outline'}
                    size={'lg'}
                    type="submit"
                    >
                        {
                            isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        }
                        Update Core Chapter
                    </Button>
                </form>
            </Form>
        </>
    )
}