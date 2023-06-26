'use client'
import { columns } from "./columns"
import { QuizTable } from "./quiz-table"
import useSWR from "swr"
import { fetcher, fetcherWithToken } from "@/lib/fetchers"
import { useSession } from "next-auth/react"
 


export default function UserManagement() {
    const {data:session} = useSession()
    const {data:quizScoresData, isLoading, error} = useSWR(
        //@ts-ignore
        ['/quizScores?withMateri=true',session?.user?.accessToken],
        ([url,accessToken])=>fetcherWithToken(url,accessToken),
        {refreshInterval: 1000}
        
        )
    
    return(
        <div>
            {
                quizScoresData &&
                <QuizTable columns={columns} data={quizScoresData?.data.reverse()} />
            }
        </div>
    )
}