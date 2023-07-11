'use client'
import { columns } from "./columns"
import { CategoryTable } from "./table"
import useSWR from "swr"
import { fetcher, fetcherWithToken } from "@/lib/fetchers"
import { useSession } from "next-auth/react"


export default function RoleManagement() {
    const {data:session} = useSession()
    const {data:CategoriesData, isLoading, error} = useSWR(
        //@ts-ignore
        '/categories',fetcher)
    
    
    return(
        <div>
            {
                CategoriesData &&
                <CategoryTable columns={columns} data={CategoriesData?.data} />
            }
        </div>
    )
}