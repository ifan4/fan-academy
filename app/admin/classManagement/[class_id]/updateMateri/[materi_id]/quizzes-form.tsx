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
import { fetcher, fetcherWithToken, fetchers } from "@/lib/fetchers";
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
import { quiz } from "@/types/interfaces";
import { useRouter } from "next/navigation";
import Editor from "@/components/textEditor";

interface Props{
    class_id: string;
    materi_id: string;
}

const quizSchema = z.object({
    id: z.string().optional(),
    materi_id: z.string(),
    question: z.string().min(10,{
        message: 'Question must contain at least 10 character(s)'
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
    quizzes: z.array(quizSchema)
})
type formDefaultValues = z.infer<typeof formSchema>

export default function QuizzesForm(
    {params,quizzes}: {params: Props,quizzes:quiz[]}
)
{
    const { toast } = useToast()
    const {data:session} = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })
    const { fields, append,remove } = useFieldArray({
        name: "quizzes",
        control: form.control,
    })

    useEffect(()=>{
        console.log('quizzes');
        console.log(quizzes);
        
        if (form.getValues('quizzes').length == 0 && quizzes?.length !== 0){
            quizzes?.forEach((quiz:quiz) => {
                append({
                    id: `${quiz.id}`,
                    materi_id: `${quiz.materi_id}` || '',
                    question: quiz.question,
                    opsi_a: quiz.opsi_a,
                    opsi_b: quiz.opsi_b,
                    opsi_c: quiz.opsi_c || '',
                    opsi_d: quiz.opsi_d || '',
                    opsi_e: quiz.opsi_e || '',
                    answer: quiz.answer
                });
            })
        }
    },[quizzes])


    const onSubmit = async (values:z.infer<typeof formSchema>)=> {
        setIsLoading(true)
        
        values.quizzes.forEach(async (quiz) => {
            try {
                if (quiz.id){
                    await fetchers(`/quizzes/update/${quiz.id}`,{
                        method: 'POST',
                        headers: {
                            //@ts-ignore
                            Authorization: 'Bearer ' + session?.user?.accessToken,
                            "Content-Type": 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({
                            materi_id: quiz.materi_id,
                            question: quiz.question,
                            opsi_a: quiz.opsi_a,
                            opsi_b: quiz.opsi_b,
                            opsi_c: quiz.opsi_c,
                            opsi_d: quiz.opsi_d,
                            opsi_e: quiz.opsi_e,
                            answer: quiz.answer,
                            _method: 'PATCH'
                        })
                    })
                }else {
                    await fetchers('/quizzes/add',{
                        method: 'POST',
                        headers: {
                            //@ts-ignore
                            Authorization: 'Bearer ' + session?.user?.accessToken,
                            "Content-Type": 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({
                            materi_id: params.materi_id,
                            question: quiz.question,
                            opsi_a: quiz.opsi_a,
                            opsi_b: quiz.opsi_b,
                            opsi_c: quiz.opsi_c,
                            opsi_d: quiz.opsi_d,
                            opsi_e: quiz.opsi_e,
                            answer: quiz.answer
                        })
                    })
                }

                toast({
                    title: 'Success',
                    description: (
                        <div className="mt-2 w-[340px] break-all rounded-md bg-teal-800 p-4">
                            <p className="text-white break-all">Quizzes successfully updated!</p>
                        </div>
                    )
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
            } finally{
                setIsLoading(false)
            }
            
            
        });
    }

    const onDelete = async(quiz_id:string|number|null|undefined, index:number)=> {
        try {
            if(quiz_id){
                const quizDeleted = await fetchers(`/quizzes/delete/${quiz_id}`,{
                    method: 'DELETE',
                    headers: {
                        //@ts-ignore
                        Authorization: 'Bearer ' + session?.user?.accessToken
                    }
                })

                remove(index)
            }else {
                remove(index)
            }

            toast({
                title: 'Success',
                description: (
                    <div className="mt-2 w-[340px] break-all rounded-md bg-teal-800 p-4">
                        <p className="text-white break-all">Quiz successfully deleted!</p>
                    </div>
                )
            })
           
        } catch (error) {
            toast({
                title: 'Failed',
                description: (
                    <div className="mt-2 w-[340px] break-all rounded-md bg-red-800 p-4">
                        <p className="text-white break-all">Quiz Failed to delete!</p>
                    </div>
                )
            })
        }
    }

    return(
        <>
            <Form {...form}>
                <form 
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
                >
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
                                                <Editor 
                                                placeholder="Input question here"
                                                onChange={(value:any) => {
                                                    field.onChange(value.content)
                                                }}
                                                value={field.value}
                                                />  
                                            </FormControl>
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
                                                    !((form.getValues(`quizzes.${index}.opsi_a`) &&
                                                    form.getValues(`quizzes.${index}.opsi_b`)) &&
                                                    (form.getValues(`quizzes.${index}.opsi_c`) ||
                                                    form.getValues(`quizzes.${index}.opsi_d`) ||
                                                    form.getValues(`quizzes.${index}.opsi_e`)))
                                                }
                                                onValueChange={field.onChange} 
                                                defaultValue={field.value || undefined}
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
                                                                form.getValues(`quizzes.${index}.opsi_a`)  
                                                                || "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_b`)}
                                                        >
                                                            B.{' '}
                                                            {
                                                                form.getValues(`quizzes.${index}.opsi_b`)  
                                                                || "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_c`) || ''}
                                                        >
                                                            C.{' '}
                                                            {
                                                                form.getValues(`quizzes.${index}.opsi_c`)  
                                                                || "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_d`) || '' }
                                                        >
                                                            D.{' '}
                                                            {
                                                                form.getValues(`quizzes.${index}.opsi_d`)  
                                                                || "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                        <SelectItem 
                                                        value={form.getValues(`quizzes.${index}.opsi_e`) || ''}
                                                        >
                                                            E.{' '}
                                                            {
                                                                form.getValues(`quizzes.${index}.opsi_e`)  
                                                                || "Hasn't filled"
                                                            }
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <AlertDialog>
                                            <AlertDialogTrigger className="text-red-800">Delete</AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete this quiz
                                                    and remove this quiz from our servers.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction 
                                                className="text-red-600"
                                                onClick={()=>onDelete(form.getValues(`quizzes.${index}.id`),index)}
                                                >Continue Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                            {/* <Button 
                                        className="text-red-400"
                                        variant={'link'}
                                        onClick={()=>remove(index)}
                                        >
                                            Delete
                                        </Button> */}
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
                                id: '',
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
                    variant={'outline'}
                    size={'lg'}
                    type="submit"
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {
                            isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        }
                        Update Quizzes
                    </Button>
                </form>
            </Form>
        </>
    )
}