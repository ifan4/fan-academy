'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcherWithToken } from "@/lib/fetchers";
import { Gem, ListChecks, Check, X } from "lucide-react";
import { useSession } from "next-auth/react"
import { ReactNode } from "react";
import useSWR from "swr"



export default function Dashboard() {
    const {data:session} = useSession();
    const {data, isLoading, error} = useSWR(
        //@ts-ignore
        ['/quizScores/summary/quizzes/score',session?.user?.accessToken],
        ([url,accessToken])=>fetcherWithToken(url,accessToken))
    
    return(
        <div>
            <h1 className="text-lg lg:text-2xl font-bold mb-3 lg:mb-7">Quiz Summary</h1>
            <div className="grid lg:grid-cols-4 gap-4 w-full">
                <NewCard 
                title="Average Score" 
                value={data?.average_score}
                icon= {<Gem/>}
                />
                <NewCard 
                title="Total Quizzes Submitted" 
                value={data?.total_quizzes}
                icon={<ListChecks/>}
                />
                <NewCard 
                title="Total Correct Questions" 
                value={data?.total_correct}
                icon={<Check/>}

                />
                <NewCard 
                title="Total Wrong Questions" 
                value={data?.total_wrong}
                icon={<X/>}
                />
            </div>
        </div>
    )
}


const NewCard =  (
    {title,value,icon}:
    {title:string,value:number,icon:ReactNode}
) => {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <span className="flex justify-center items-center w-4 h-4">
                        {icon}
                    </span>
            </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}