'use client'
import { columns } from "./columns"
import { AdminTable } from "./admin-table"
import useSWR from "swr"
import { fetcher, fetcherWithToken } from "@/lib/fetchers"
import { useSession } from "next-auth/react"
 


export default function UserManagement() {
    const {data:session} = useSession()
    const {data:userData, isLoading, error} = useSWR(
        //@ts-ignore
        ['/admins',session?.user?.accessToken],
        ([url,accessToken])=>fetcherWithToken(url,accessToken))

    return(
        <div>
            {
                userData &&
                <AdminTable columns={columns} data={userData} />
            }
        </div>
    )
}