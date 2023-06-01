'use client'
import Sidebar from "./sidebar";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetcher } from "@/lib/fetchers";
import { materi } from "@/types/interfaces";
import useSWR from "swr";
import ListMateri from "./listMateri";
import { convertDate } from "@/lib/helper";
import Loading from "./loading";

interface Props{
  class_id: string;
  materi_id:string;
}
export default function ClassDetail({ params }: { params: Props }) {
  const { class_id } = params  
  const {data, error, isLoading} = useSWR(`/class/${class_id}?with_materis=true`,fetcher)
    if (error) throw new Error(error); 
    if (isLoading) return <Loading/>
    
    
    return(
        <div className="flex w-full">
            <div className="xl:w-80 fixed h-screen">
              <Sidebar materis={data?.data?.materis}/>
            </div>
            <div className="ms-80 p-8 pt-0 w-full">
                {
                    data && 
                    <>
                        <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10">{data.data.name}</h3>
                        <small className="text-sm font-medium leading-none"> Published at {convertDate(data.data.created_at)}</small>
                       
                        <p className="leading-7 [&:not(:first-child)]:mt-6 mb-10">{data.data.description}</p>
                        <h4 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">List Materi</h4>
                        <ListMateri materis={data?.data?.materis}/>   
                    </>
                }
                
            
            </div>
        </div>
    )
}



