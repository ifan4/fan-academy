'use client'

import { fetcherWithToken } from "@/lib/fetchers";
import { useSession } from "next-auth/react"
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
            <div className="grid lg:grid-cols-4 gap-4 w-full text-center">
                <Card title="Average Score" value={data?.average_score}/>
                <Card title="Total Quizzes Submitted" value={data?.total_quizzes}/>
                <Card title="Total Correct Questions" value={data?.total_correct}/>
                <Card title="Total Wrong Questions" value={data?.total_wrong}/>
            </div>
        </div>
    )
}

const Card = ({title,value}:{title:string,value:number}) => {

    return(
        <div className="border py-8">
            <h4>{title}</h4>
            <div className="text-2xl font-semibold">{value}</div>
        </div>
    )
}