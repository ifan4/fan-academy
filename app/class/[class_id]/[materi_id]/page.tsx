'use client'
import Sidebar from "../sidebar";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetcher, fetcherFile } from "@/lib/fetchers";
import { materi } from "@/types/interfaces";
import useSWR from "swr";
import Loading from "../loading";
import Quizzes from "./quizzes";
import { useSession } from "next-auth/react";
import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";


interface Props{
  class_id: string;
  materi_id:string;
}
export default function ClassDetail({ params }: { params: Props }) {
  const { class_id, materi_id } = params  
  const {data:session} = useSession() 
  
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false)

  const {data:dataClass, error, isLoading} = useSWR(`/class/${class_id}?with_materis=true`,fetcher, {refreshInterval: 20000})

  const {data:dataMateri, error:errMateri, isLoading:isLoadingMateri} = useSWR(`/materi/${materi_id}`,fetcher, {refreshInterval: 20000})
  
  const onDownload = async()=>{
    setIsFileLoading(true)
    try {
      // @ts-ignore
      return await fetcherFile(`/materi/download/${dataMateri?.data?.file_materi}`,session?.user?.accessToken)
    } catch (error) {
      
    }
    finally{
      setIsFileLoading(false)
    }
  }

  if (isLoadingMateri) <Loading/>
  // if (error || errMateri) throw new Error(error || errMateri); 
  const Tabs_materi = ({id,description,title,file,video,created_at}:materi) => {
    return (
      <Tabs defaultValue="materi" className="">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="materi">Materi</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="materi" className="border p-3">
          <div className="flex justify-center mb-3">
              <iframe className="lg:w-[800px] border-slate-800 border-8 rounded-xl" height="400" src={video} title="video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-4">{title}</h3> 
          <p>
            {description}
          </p>
          <Button 
          onClick={()=>onDownload()}
          className="space-x-2 my-2">
            {
              !isFileLoading 
              ? <>
                  <Eye/>
                </>
              : <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            }
            <div>Lihat Materi</div>
          </Button>
        </TabsContent>
        <TabsContent value="quiz">
          <div className="border lg:px-10">
              <Quizzes materi_id={id}/>
          </div>
        </TabsContent>
      </Tabs>
    )
  }
  
  return(
      <div className="flex w-full">
          <div className="xl:w-80 fixed h-screen">
            <Sidebar materis={dataClass?.data.materis}/>
          </div>
          <div className="ms-80 p-8 pt-0 w-full">
            <Tabs_materi
            id={dataMateri?.data?.id}
            description={dataMateri?.data?.description} 
            title={dataMateri?.data?.title} 
            file={dataMateri?.data?.file_materi}
            video={dataMateri?.data?.video_materi} 
            created_at={new Date} 
            />
          </div>
      </div>
  )
}





