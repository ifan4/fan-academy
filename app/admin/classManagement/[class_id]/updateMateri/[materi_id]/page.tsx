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
import { quiz } from "@/types/interfaces";
import { isBreakOrContinueStatement } from "typescript";
import { useRouter } from "next/navigation";
import MateriForm from "./core-materi-form";
import QuizzesForm from "./quizzes-form";

interface Props{
    class_id: string;
    materi_id: string;
}


export default function UpdateMateri({params}: {params: Props}){
    // const {data, isLoading:isDataLoading, error} = useSWR(`/class/${class_id}`, fetcher)
    const { toast } = useToast()
    const {data:session} = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { data, isLoading:isLoadingData, error } = useSWR(
        //@ts-ignore
        [`/materi/${params.materi_id}?with_quizzes=true`, session?.user?.accessToken],
        ([url,accessToken])=> fetcherWithToken(url,accessToken)
    )








    return(
        <>
        {
            data &&
            <div className="space-y-7">
                <MateriForm params={params} materi={data?.data}/>
                <QuizzesForm params={params} quizzes={data?.data.quizzes} />
            </div>
        }
        </>
    )
}