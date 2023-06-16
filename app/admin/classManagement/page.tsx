'use client'
import { Payment, columns } from "./columns"
import { ClassTable } from "./class-table"
import useSWR from "swr"
import { fetcher, fetcherWithToken } from "@/lib/fetchers"
import { useSession } from "next-auth/react"
 


export default function classManagement() {
    const {data:session} = useSession()
    // const data = await getData()
    const {data:classData, isLoading, error} = useSWR(
        //@ts-ignore
        ['/class',session?.user?.accessToken],
        ([url,accessToken])=>fetcher(url))

    return(
        <div>
            {
                classData &&
                <ClassTable columns={columns} data={classData?.data} />
            }
        </div>
    )
}