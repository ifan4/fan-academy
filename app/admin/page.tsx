'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserNav } from "./navigasi";
import { Sidebar } from "./sidebar";
import { ReactNode } from "react";
import useSWR from "swr";
import { fetcherWithToken } from "@/lib/fetchers";
import { Building, FolderTree, ListChecks, Users2 } from "lucide-react";
import { useSession } from "next-auth/react";


export default function Admin() {
    const {data:session} = useSession()
    const {data, isLoading, error} = useSWR(
        //@ts-ignore
        ['/dashboard/totalData',session?.user?.accessToken],
        ([url,accessToken])=>fetcherWithToken(url,accessToken))
    

    return(
        <div className="grid lg:grid-cols-4 gap-4 w-full">
            <DashCard 
            title="Total Kelas" 
            value={data?.data.total_kelas}
            icon= {<Building/>}
            />
            <DashCard 
            title="Total Materi" 
            value={data?.data.total_materi}
            icon={<FolderTree/>}
            />
            <DashCard 
            title="Total Quizzes" 
            value={data?.data.total_quiz}
            icon={<ListChecks/>}

            />
            <DashCard 
            title="Total User" 
            value={data?.data.total_user}
            icon={<Users2/>}
            />
        </div>
    )
}

const DashCard =  (
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
                <div className="text-2xl font-bold">{value || 0}</div>
            </CardContent>
        </Card>
    )
}