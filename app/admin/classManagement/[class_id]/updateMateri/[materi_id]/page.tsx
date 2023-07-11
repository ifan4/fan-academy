'use client'


import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2,Trash } from "lucide-react";
import useSWR from "swr";
import { fetcher, fetcherWithToken, fetchers } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import MateriForm from "./core-materi-form";
import QuizzesForm from "./quizzes-form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface Props{
    class_id: string;
    materi_id: string;
}


export default function UpdateMateri({params}: {params: Props}){
    // const {data, isLoading:isDataLoading, error} = useSWR(`/class/${class_id}`, fetcher)
    const { toast } = useToast()
    const {data:session} = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { data, isLoading:isLoadingData, error } = useSWR(
        //@ts-ignore
        [`/materi/${params.materi_id}?with_quizzes=true`, session?.user?.accessToken],
        ([url,accessToken])=> fetcherWithToken(url,accessToken)
    )


    const deleteChapter = async()=> {
        try {
            await fetchers(`/materi/delete/${params.materi_id}`,{
                method: 'DELETE',
                headers: {
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user?.accessToken,
                }
            })

            toast({
                title: 'Success',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-teal-700 p-4">
                        <p className="text-white">Chapter Successfully deleted!</p>
                    </pre>
                )
            })

            return router.push(`/admin/classManagement/${params.class_id}`)
        } catch (error) {
            return toast({
                title: 'Failed',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
                        <p className="text-white">Chapter Failed to delete!</p>
                    </pre>
                )
            })
        }
    }

    return(
        <>
        <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Update Chapter</h1>
           
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                size={'sm'} 
                variant={'destructive'}>
                    <Trash className="mr-2 w-4 h-4"/>
                    Delete This Chapter
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this chapter and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                className="text-red-700"
                onClick={deleteChapter} 
                >
                    Continue Delete 
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
        {
            data &&
            <div className="space-y-7">
                <MateriForm params={params} materi={data?.data}/>
                <QuizzesForm params={params} quizzes={data?.data.quizzes} />
            </div>
        }
        
        </>
    )
}