'use client'
import { Payment, columns } from "./columns"
import { ClassTable } from "./class-table"
import useSWR from "swr"
import { fetcher, fetcherWithToken } from "@/lib/fetchers"
import { useSession } from "next-auth/react"
 


export default function classManagement() {
    const {data:session} = useSession()
    const {data:userData, isLoading, error} = useSWR(
        //@ts-ignore
        ['/users',session?.user?.accessToken],
        ([url,accessToken])=>fetcherWithToken(url,accessToken))

    return(
        <div>
            {
                userData &&
                <ClassTable columns={columns} data={userData} />
            }
        </div>
    )
}