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
import '@/components/textEditor/plugins/style.css'

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

    
    const {
        data:userAnswers, 
        isLoading:userAnswersLoading, 
        error:userAnswersError,
    } = useSWR(
        isThereUserScores 
        ?
         // @ts-ignore
        [`/quizScores?materi_id=${materi_id}&user_id=${session?.user?.id}`,session?.user?.accessToken]
        :
        null
        , 
        ([url,accessToken])=> fetcherWithToken(url,accessToken),
        {suspense:true}
    )
    console.log('userAnswers');
    console.log(userAnswers);
    

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
                <pre className="mt-2 w-[340px] rounded-md bg-teal-700 p-4">
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
                {
                    quizzes?.data.length > 0 && !isThereUserScores 
                    ?
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pb-7">
                        <ol className="px-8 list-decimal [&>li]:mt-2">
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
                                    <div 
                                    className=" bg-white text-black rounded-md p-3 overflow-x-scroll lg:overflow-x-auto"
                                    dangerouslySetInnerHTML={{__html: fieldx.data.question}}>
                                    </div>      
                                    {/* <FormLabel className="scroll-m-20 text-xl lg:text-2xl font-semibold tracking-tight">{}</FormLabel> */}
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
                        </ol>
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
                :
                    !isThereUserScores ? 
                
                    <div className="flex h-[300px] text-center lg:h-[400px] justify-center items-center p-3">
                        <div>
                            <h1 className="text-3xl">
                                There are no quizzes available on this chapter right now.
                            </h1>
                            <p>
                                However, we have plenty of quizzes in other chapters waiting for you! To challenge yourself and test your knowledge, please access to another chapter.
                            </p>
                        </div>
                    </div>

                    :
                        <ol className={`px-8 list-decimal [&>li]:mt-2`}>
                        {
                            userAnswers?.data.map((data:any,key:number)=>(
                                    <li key={key} className={`p-2 ${data.score==="0" ? "bg-red-300 rounded-md" : "bg-emerald-300 rounded-md"}`}>

                                    <div 
                                    className={`bg-white text-black rounded-md p-3 overflow-x-scroll lg:overflow-x-auto`}
                                    dangerouslySetInnerHTML={{__html: data?.quiz.question}}>
                                    </div>      
                                        <RadioGroup
                                        disabled
                                        defaultValue={data?.answer}
                                        className="flex flex-col space-y-1 py-2"
                                        >
                                            <OptionItem_userAnswers optionText={data?.quiz?.opsi_a}/>
                                            <OptionItem_userAnswers optionText={data?.quiz?.opsi_b}/>
                                            {
                                                data?.quiz?.opsi_c &&
                                                <OptionItem_userAnswers optionText={data?.quiz?.opsi_c}/>
                                            }
                                            {
                                                data?.quiz?.opsi_d &&
                                                <OptionItem_userAnswers optionText={data?.quiz?.opsi_d}/>
                                            }
                                            {
                                                data?.quiz?.opsi_e &&
                                                <OptionItem_userAnswers optionText={data?.quiz?.opsi_e}/>
                                            }
                                            
                                        </RadioGroup>
                                        {
                                            data.score === "0" 
                                            ? <p className="text-red-800 text-2xl text-center">Wrong Answer</p>
                                            : <p className="text-emerald-950 text-2xl text-center">Correct Answer</p>
                                        }

                                    </li>
                                ))
                            }
                            
                        </ol>
                }    
        </>
    )
}

const OptionItem = ({optionText}:{optionText:string})=>{
    return(
        <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
                <RadioGroupItem value={optionText}/>
            </FormControl>
            <FormLabel className="font-normal text-sm lg:text-xl rounded-lg p-4 dark:bg-slate-900 bg-white ring-1 ring-slate-900/5 shadow-lg hover:bg-sky-500 hover:ring-sky-500 w-full">
                {optionText}
            </FormLabel>
        </FormItem>
    )
} 
const OptionItem_userAnswers = ({optionText}:{optionText:string})=>{
    return(
        <div className="flex items-center space-x-3 space-y-0">

            <RadioGroupItem value={optionText}/>
    
            <label className="font-normal text-sm lg:text-xl rounded-lg p-4 dark:bg-slate-900 bg-white ring-1 ring-slate-900/5 shadow-lg hover:bg-sky-500 hover:ring-sky-500 w-full">
                {optionText}
            </label>
        </div>
    )
} 
