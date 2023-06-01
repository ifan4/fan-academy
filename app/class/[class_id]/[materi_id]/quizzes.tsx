'use client'
import { fetcherWithToken } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import useSWR from "swr"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/react-hook-form/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast";
import { answers, quiz } from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import CardResult from "./cardResult";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface Props{
    materi_id: string
}


const answerSchema = z.object({
    quiz_id: z.string(),
    value: z.string().nonempty({message:'required'}),
    data: z.any()
})
const answersFormSchema = z.object({
    answers: z.array(answerSchema)
})

type AnswersFormValues = z.infer<typeof answersFormSchema>




export default function Quizzes({materi_id}:Props) {
    const {data:session} = useSession()
    const { toast } = useToast()
    const {data:quizzes,error,isLoading} = useSWR(
        // @ts-ignore
        [`/quizzes/materi/${materi_id}`,session?.user?.accessToken], 
        ([url,accessToken])=> fetcherWithToken(url,accessToken),
        {suspense:true}
    )

    const [answers,setAnswers] = useState<AnswersFormValues>()
    
    

    const form = useForm<AnswersFormValues>({
        resolver: zodResolver(answersFormSchema),
        mode: 'onChange'
    })
    const { fields, append } = useFieldArray({
        name: "answers",
        control: form.control,
    })
    useEffect(()=>{
        quizzes.data.map((quiz:quiz) => {
            return append({
                quiz_id: `${quiz.id}`,
                value: '',
                data: quiz
            })
            
        });
    },[append])
 
    
      
    function onSubmit(data: AnswersFormValues) {
        
        return toast({
            title: "You submitted the following values:",
            description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
        })
    }
    

    return(
        <>
            <CardResult/>
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 font-bold text-2xl">
                {
                    quizzes && 
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {
                            fields.map((fieldx,index)=>(
                                <FormField
                                key={fieldx.id}
                                control={form.control}
                                //@ts-ignore
                                name={`answers.${index}.value`}
                                render={({ field }) => (
                                    <li>
                                    <FormItem className="space-y-3 mb-8">
                                    <FormLabel className="scroll-m-20 text-2xl font-semibold tracking-tight">{fieldx.data.question}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                        onValueChange={field.onChange}
                                        className="flex flex-col space-y-1"
                                        >
                                            <OptionItem optionText={fieldx?.data?.opsi_a}/>
                                            <OptionItem optionText={fieldx?.data?.opsi_b}/>
                                            {
                                                // quiz.opsi_c &&
                                                <OptionItem optionText={fieldx?.data?.opsi_c}/>
                                            }
                                            {
                                                // quiz.opsi_d &&
                                                <OptionItem optionText={fieldx?.data?.opsi_d}/>
                                            }
                                            {
                                                // quiz.opsi_e &&
                                                <OptionItem optionText={fieldx?.data?.opsi_e}/>
                                            }
                                            
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                    </li>
                                )}
                                />
                            ))
                        }

                        <Button className="w-full" type="submit">Save My Answers</Button>
                    </form>
                </Form>
                }    
            </ol>
        </>
    )
}

const OptionItem = ({optionText}:{optionText:string})=>{
    return(
        <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
                <RadioGroupItem value={optionText}/>
            </FormControl>
            <FormLabel className="font-normal text-xl rounded-lg p-4 dark:bg-slate-900 bg-white ring-1 ring-slate-900/5 shadow-lg hover:bg-sky-500 hover:ring-sky-500 w-full">
                {optionText}
            </FormLabel>
        </FormItem>
    )
} 
