'use client'

import useSWR from "swr";
import { MateriTable } from "./table/materi-table";
import UpdateClassForm from "./update-class-form";
import { columns } from "./table/columns";
import { fetcher } from "@/lib/fetchers";


interface Props{
    class_id: string;
  }


export default function ClassDetails({params}: {params: Props}) {
    const { data, isLoading, error } = useSWR(`/materi/classes/${params.class_id}`, fetcher )
    

    return(
        <>
            <h1 className="text-2xl">Class Details</h1>
            <UpdateClassForm class_id={params.class_id}/>
            <div className="py-8">
                <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
                    Materi list
                </h1>
                {
                    data && <MateriTable columns={columns} data={data?.data} class_id={params.class_id}/>
                }
            </div>
        </>
    )
}