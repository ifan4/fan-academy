'use client'
import { fetcherWithToken, fetchers } from "@/lib/fetchers";
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
import { Loader2 } from "lucide-react";


const answerSchema = z.object({
    quiz_id: z.string(),
    value: z.string().nonempty({message:'required quiz'}),
    data: z.any()
})
const answersFormSchema = z.object({
    answers: z.array(answerSchema)
})

type AnswersFormValues = z.infer<typeof answersFormSchema>


export default function Quizzes({materi_id}:{materi_id:string}) {
    
    const {data:session} = useSession()
    const { toast } = useToast()
    const [isThereUserScores, setIsThereUserScores] = useState<boolean>(false)
useState<boolean>(true)
    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false) 
    const [isLoadingTryAgain, setIsLoadingTryAgain] = useState<boolean>(false) 

    const {data:quizzes,error,isLoading} = useSWR(
        // @ts-ignore
        [`/quizzes/materi/${materi_id}`,session?.user?.accessToken], 
        ([url,accessToken])=> fetcherWithToken(url,accessToken),
        {suspense:true}
    )

    const {
        data:userScores, 
        isLoading:isUserScoresLoading, 
        error:userScoresError,
        mutate
    } = useSWR(
         // @ts-ignore
        [`/quizScores/user/materi/${materi_id}`,session?.user?.accessToken], 
        ([url,accessToken])=> fetcherWithToken(url,accessToken),
        {suspense:true}
    )

    useEffect(()=>{
        if ( userScores?.data.length !== 0){
            return setIsThereUserScores(true)
        }
        return setIsThereUserScores(false)
    },[userScores])

    

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

    const onTryAgain = async() => {
        setIsLoadingTryAgain(true)
        try {
            const res = await fetchers(`/quizScores/delete/materi/${materi_id}`,{
                method: 'DELETE',
                headers: {
                    // @ts-ignore   
                    Authorization: `Bearer ` + session?.user?.accessToken,
                }
            })
            console.log(res);
            
            mutate()
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingTryAgain(false)
        }
    }

    async function onSubmit(data: AnswersFormValues) {
        setIsLoadingSubmit(true)
        const newData = {
            answers: data.answers.map((d)=> (
                {
                    quiz_id: parseInt(d.quiz_id),
                    answer: d.value
                }
            ))
        }

        try {
            await fetchers(`/quizScores/addAllAnswers/${materi_id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    accept: 'application/json',
                    // @ts-ignore   
                    Authorization: `Bearer ` + session?.user?.accessToken,
                },
                body: JSON.stringify(newData)
            })

            mutate()
            return toast({
                title: "You submitted the following values:",
                description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <p className="text-white">Quizzes Successfully Submitted!</p>
                </pre>
                ),
            })
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoadingSubmit(false)
        }
        
    }
    
    

    return(
        <>
            {
                isThereUserScores &&
                <CardResult 
                userScores={userScores} 
                onTryAgain={onTryAgain}
                isLoading={isLoadingTryAgain}
                />
            }
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 font-bold text-2xl">
                {
                    quizzes && !isThereUserScores && 
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
                                                fieldx?.data?.opsi_c &&
                                                <OptionItem optionText={fieldx?.data?.opsi_c}/>
                                            }
                                            {
                                                fieldx?.data?.opsi_d &&
                                                <OptionItem optionText={fieldx?.data?.opsi_d}/>
                                            }
                                            {
                                                fieldx?.data?.opsi_e &&
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

                        <Button 
                        className="w-full" 
                        type="submit"
                        >
                            {
                                isLoadingSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            }
                            Save My Answers
                        </Button>
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
