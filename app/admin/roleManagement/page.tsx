'use client'
import { columns } from "./columns"
import { RoleTable } from "./role-table"
import useSWR from "swr"
import { fetcher, fetcherWithToken } from "@/lib/fetchers"
import { useSession } from "next-auth/react"


export default function RoleManagement() {
    const {data:session} = useSession()
    const {data:roleData, isLoading, error} = useSWR(
        //@ts-ignore
        ['/roles',session?.user?.accessToken],
        ([url,accessToken])=>fetcherWithToken(url,accessToken))

    return(
        <div>
            {
                roleData &&
                <RoleTable columns={columns} data={roleData} />
            }
        </div>
    )
}