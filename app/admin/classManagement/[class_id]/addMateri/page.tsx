'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/react-hook-form/form";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { EventHandler, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { fetcher, fetchers } from "@/lib/fetchers";
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
import { quiz } from "@/types/interfaces";
import { isBreakOrContinueStatement } from "typescript";
import { useRouter } from "next/navigation";

interface Props{
    class_id: string;
}

const quizSchema = z.object({
    materi_id: z.string(),
    question: z.string().min(10,{
        message: 'Question must contain at least 10 characters'
    }),
    opsi_a: z.string().nonempty({
        message: "Option a doesn't allow to empty"
    }),
    opsi_b: z.string().nonempty({
        message: "Option b doesn't allow to empty"
    }),
    opsi_c: z.string().optional(),
    opsi_d: z.string().optional(),
    opsi_e: z.string().optional(),
    answer: z.string().nonempty({
        message: 'You have to choose answer'
    })
})

const formSchema = z.object({
    title: z.string().min(10, {
        message: 'Title must be at least 10 characters.'
    }),
    description:z.string().min(20, {
        message: 'Description must be at least 50 characters.'
    }),
    file:  z.any(),
    video:z.string(),
    quizzes: z.array(quizSchema)
})
type formDefaultValues = z.infer<typeof formSchema>
const defaultValues: Partial<formDefaultValues> = {
    title: '',
    description: '',
    file: '',
    video: '',
    quizzes: [
        {
            materi_id: '',
            question: '',
            opsi_a: '',
            opsi_b: '',
            opsi_c: '',
            opsi_d: '',
            opsi_e: '',
            answer: ''
        },
    ]
  }


export default function MateriForm({params}: {params: Props}){
    // const {data, isLoading:isDataLoading, error} = useSWR(`/class/${class_id}`, fetcher)
    const { toast } = useToast()
    const {data:session} = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    
    const form = useForm<formDefaultValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    })
    const { fields, append,remove } = useFieldArray({
        name: "quizzes",
        control: form.control,
    })



    const onSubmit = async(values:z.infer<typeof formSchema>)=> {
        setIsLoading(true)

        const formData = new FormData()
        formData.append('class_id', params.class_id)
        formData.append('title', values.title)
        formData.append('description', values.description)
        formData.append('file', values.file[0])
        formData.append('video_materi', values.video)
        
        try {
            const newMateri = await fetchers('/materi/add',{
                method: 'POST',
                headers: {
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user?.accessToken,
                },
                body: formData
            })

            try {
                await sendQuiz(values.quizzes,newMateri.data.id)
                toast({
                    title: 'Success',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <p className="text-white">Materi Successfully Added!</p>
                        </pre>
                    )
                })

                return router.push(`/admin/classManagement/${params.class_id}`)
            } catch (error) {
                return toast({
                    variant: 'destructive',
                    title: 'Failed',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <p className="text-white">Quizzes failed to submit. But a materi Successfully Added!</p>
                        </pre>
                    )
                })
            }
            
        } catch (error) {
            return toast({
                variant: 'destructive',
                title: 'Failed',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <p className="text-white">Failed submit materi and quizzes!</p>
                    </pre>
                )
            })
            
        } finally{
            setIsLoading(false)
        }
    }

    const sendQuiz = async(quizzes:z.arrayOutputType<typeof quizSchema>,materi_id:string)=> {

        quizzes.forEach(async (quiz) => {
            try {
                await fetchers('/quizzes/add',{
                    method: 'POST',
                    headers: {
                        //@ts-ignore
                        Authorization: 'Bearer ' + session?.user?.accessToken,
                        "Content-Type": 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        materi_id: materi_id,
                        question: quiz.question,
                        opsi_a: quiz.opsi_a,
                        opsi_b: quiz.opsi_b,
                        opsi_c: quiz.opsi_c,
                        opsi_d: quiz.opsi_d,
                        opsi_e: quiz.opsi_e,
                        answer: quiz.answer
                    })
                })
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Failed',
                    description: (
                        <div className="mt-2 w-[340px] break-all rounded-md bg-slate-950 p-4">
                            <p className="text-white break-all">Quizzes failed to submit. But a materi Successfully Added!</p>
                        </div>
                    )
                })
                throw new Error('Failed to submit quizzes')
            }
            
            
        });
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
                            <FormLabel>Chapter File</FormLabel>
                            <FormControl>
                                <Input 
                                type="file" 
                                placeholder="Upload Chapter File" 
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

                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl border-t-[20px] rounded-3xl py-4 text-center">
                        QUIZ
                    </h1>
                    <ol className="space-y-5 list-decimal">
                        {
                            fields.map((fieldx,index)=> (
                                <li key={fieldx.id} className="pb-6 p-4 rounded-xl border-y-4">
                                    <FormField
                                    control={form.control}
                                    name={`quizzes.${index}.question`}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                            <Textarea 
                                            className=""
                                            placeholder="Input question here" {...field} 
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <ol className="list-[square] space-y-3 mt-2" type="A">
                                        <li>
                                            <FormField
                                            control={form.control}
                                            name={`quizzes.${index}.opsi_a`}
                                            render={({field}) => (
                                                <FormItem className="lg:ml-2 inline-block lg:w-[800px]">
                                                    <FormControl>
                                                        
                                                    <Input 
                                                    placeholder="option a" {...field} 
                                                    />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        </li>
                                        <li>
                                            <FormField
                                            control={form.control}
                                            name={`quizzes.${index}.opsi_b`}
                                            render={({field}) => (
                                                <FormItem className="lg:ml-2 inline-block lg:w-[800px]">
                                                    <FormControl>
                                                    <Input 
                                                    placeholder="option b" {...field} 
                                                    />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        </li>
                                        <li>
                                            <FormField
                                            control={form.control}
                                            name={`quizzes.${index}.opsi_c`}
                                            render={({field}) => (
                                                <FormItem className="lg:ml-2 inline-block lg:w-[800px]">
                                                    <FormControl>
                                                    <Input 
                                                    placeholder="option c" {...field} 
                                                    />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        </li>
                                        <li>
                                            <FormField
                                            control={form.control}
                                            name={`quizzes.${index}.opsi_d`}
                                            render={({field}) => (
                                                <FormItem className="lg:ml-2 inline-block lg:w-[800px]">
                                                    <FormControl>
                                                    <Input 
                                                    placeholder="option d" {...field} 
                                                    />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        </li>
                                        <li>
                                            <FormField
                                            control={form.control}
                                            name={`quizzes.${index}.opsi_e`}
                                            render={({field}) => (
                                                <FormItem className="lg:ml-2 inline-block lg:w-[800px]">
                                                    <FormControl>
                                                    <Input 
                                                    placeholder="option e" {...field} 
                                                    />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        </li>
                                    </ol>
                                    <div className="flex justify-between items-end mt-2">
                                        <FormField
                                        control={form.control}
                                        name={`quizzes.${index}.answer`}
                                        render={({ field }) => (
                                            <FormItem className="w-[400px]">
                                                <FormLabel>Answer</FormLabel>
                                                <Select 
                                                disabled={
                                                    !((form.getFieldState(`quizzes.${index}.opsi_a`).isTouched &&
                                                    form.getFieldState(`quizzes.${index}.opsi_b`).isTouched) &&
                                                    (form.getFieldState(`quizzes.${index}.opsi_c`).isTouched ||
                                                    form.getFieldState(`quizzes.${index}.opsi_d`).isTouched ||
                                                    form.getFieldState(`quizzes.${index}.opsi_e`).isTouched))
                                                }
                                                onValueChange={field.onChange} 
                                                // defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a correct answer" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent >
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_a`)}
                                                        >
                                                            A.{' '}
                                                            {
                                                                form.getFieldState(`quizzes.${index}.opsi_a`).isTouched 
                                                                ? form.getValues(`quizzes.${index}.opsi_a`)  
                                                                : "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_b`)}
                                                        >
                                                            B.{' '}
                                                            {
                                                                form.getFieldState(`quizzes.${index}.opsi_b`).isTouched 
                                                                ? form.getValues(`quizzes.${index}.opsi_b`)  
                                                                : "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_c`) || ''}
                                                        >
                                                            C.{' '}
                                                            {
                                                                form.getFieldState(`quizzes.${index}.opsi_c`).isTouched 
                                                                ? form.getValues(`quizzes.${index}.opsi_c`)  
                                                                : "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_d`) || '' }
                                                        >
                                                            D.{' '}
                                                            {
                                                                form.getFieldState(`quizzes.${index}.opsi_d`).isTouched 
                                                                ? form.getValues(`quizzes.${index}.opsi_d`)  
                                                                : "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_e`) || ''}
                                                        >
                                                            E.{' '}
                                                            {
                                                                form.getFieldState(`quizzes.${index}.opsi_e`).isTouched 
                                                                ? form.getValues(`quizzes.${index}.opsi_e`)  
                                                                : "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                            <Button 
                                        className="text-red-400"
                                        variant={'link'}
                                        onClick={()=>remove(index)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </li>
                            ))
                        }
                         <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="mt-1"
                            onClick={() => append({
                                materi_id: '',
                                question: '',
                                opsi_a: '',
                                opsi_b: '',
                                opsi_c: '',
                                opsi_d: '',
                                opsi_e: '',
                                answer: ''
                            })}
                        >
                            Add Quiz
                        </Button>
                    </ol>
                    <Button
                    size={'lg'}
                    type="submit"
                    >
                        {
                            isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        }
                        Submit Chapter
                    </Button>
                </form>
            </Form>
        </>
    )
}