'use client'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetcherWithToken } from "@/lib/fetchers";
import useSWR from "swr";
import { useSession } from "next-auth/react"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/react-hook-form/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props{
    role_id: string;
  }

export default function Details({params}: {params: Props}) {
    const {data:session} = useSession()
    const {data,isLoading, error} = useSWR(
            //@ts-ignore
            [`/roles/${params.role_id}`,session?.user?.accessToken],
            ([url,accessToken])=>fetcherWithToken(url,accessToken)
        )

    console.log(data);
    
    
    return(
        <div>
            <Link href={'/admin/roleManagement'}>
                <Button size={'sm'} className="mb-7">{'<-'} Back</Button>
            </Link>
            <h1 className="text-2xl mb-3">Role Details</h1>
            <form className={'space-y-3'}>
                <Input value={data?.name}/>
                <Textarea value={data?.description}/>
            </form>
        </div>
    )
}