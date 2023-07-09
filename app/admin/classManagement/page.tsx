'use client'
import { columns } from "./columns"
import { ClassTable } from "./class-table"
import useSWR from "swr"
import { fetcher, fetchers } from "@/lib/fetchers"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
 


export default function ClassManagement() {
    const {data:session} = useSession()
    const {data:classData, isLoading, error, mutate} = useSWR(
            //@ts-ignore
            ['/class',session?.user?.accessToken],
            ([url,accessToken])=>fetcher(url)
        )

    return(
        <div>
            {
                classData &&
                <ClassTable columns={columns} data={classData?.data} mutate={mutate}/>
            }
        </div>
    )
}

