'use client'
import Sidebar, { MobileSideBar } from "../sidebar";
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
import Link from "next/link";
import PDFReader from "./pdfReader/pdfReader";
import { useToast } from "@/components/ui/use-toast";

interface Props{
  class_id: string;
  materi_id:string;
}
export default function ClassDetail({ params }: { params: Props }) {
  const { class_id, materi_id } = params  
  const {data:session} = useSession() 
  const { toast } = useToast()
  
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false)

  const {data:dataClass, error, isLoading} = useSWR(`/class/${class_id}?with_materis=true`,fetcher)

  const {data:dataMateri, error:errMateri, isLoading:isLoadingMateri} = useSWR(`/materi/${materi_id}`,fetcher)
  
  const [filePDF, setFilePDF] = useState<any>(null);


  const onDownload = async()=>{
    setIsFileLoading(true)
    //@ts-ignore
    if(!session?.user?.accessToken){
      setIsFileLoading(false);
      return toast({
        title: 'Please Login First',
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
                <p className="text-white">
                  Please <Link href={'/auth/login'}><Button>Login</Button> </Link> to Access Modul!
                </p>
            </pre>
        )
    })
    }
    try {
      // @ts-ignore
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/materi/download/${dataMateri?.data?.file_materi}`,{
        headers: {
          //@ts-ignore
          Authorization: 'Bearer ' + session?.user?.accessToken,
        }
      })
      .then( res => res.blob() )
      .then( blob => {
        var file = window.URL.createObjectURL(blob);
        
        return setFilePDF(file)
      })
      .catch(err=>{
        console.log(res);
        throw new Error('An error occurred while fetching the data.')
      })
      
    } catch (error) {
      
    }
    finally{
      setIsFileLoading(false)
    }
  }

  if (isLoadingMateri) <Loading/>
  // if (error || errMateri) throw new Error(error || errMateri); 
  const Tabs_materi = ({id,description,title,file,video_materi,created_at}:materi) => {
    return (
      <Tabs defaultValue="materi" className="">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="materi">Materi</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="materi" className="border p-3">
          <div className="flex justify-center mb-3">
              <iframe className="w-full lg:w-[800px] border-slate-800 border-8 rounded-xl" height="400" src={video_materi} title="video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-4">{title}</h3> 
          <p className="py-7 leading-4 lg:leading-7">
            {description}
          </p>
          {
            dataMateri?.data?.file_materi &&
              <Button 
              onClick={()=>onDownload()}
              className="space-x-2 my-2 w-full lg:py-7">
                {
                  !isFileLoading 
                  ? <>
                      <Eye/>
                    </>
                  : <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                }
                <div>Lihat Modul</div>
              </Button>
          }
          {
            filePDF
              &&  <PDFReader filePDF={filePDF}/>
          }
          
        </TabsContent>
        <TabsContent value="quiz">
          <div className="border lg:px-10">
              {
                session 
                ? <Quizzes materi_id={id}/>
                : <div className="flex h-[300px] text-center lg:h-[400px] justify-center items-center p-3">
                  <h1 className="text-3xl">You have to <Link className="underline underline-offset-8 hover:text-teal-500" href={'/auth/login'}>login</Link> to access quiz</h1>
                </div>
              }
              
          </div>
        </TabsContent>
      </Tabs>
    )
  }
  
  return(
      <div className="flex flex-col lg:flex-row w-full">
          <div className="lg:w-80 fixed h-screen hidden lg:block">
            <Sidebar materis={dataClass?.data.materis}/>
          </div>
          <div className="m-4 mb-0 block lg:hidden">
              <MobileSideBar materis={dataClass?.data?.materis}/>
            </div>
          <div className="lg:ms-80 p-4 lg:p-8 pt-4 w-full">
            <Tabs_materi
            id={dataMateri?.data?.id}
            description={dataMateri?.data?.description} 
            title={dataMateri?.data?.title} 
            file={dataMateri?.data?.file_materi}
            video_materi={dataMateri?.data?.video_materi} 
            created_at={new Date} 
            />
          </div>
      </div>
  )
}





