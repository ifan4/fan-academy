'use client'

import { BellRing, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

interface Props {
    id:string;
    title: string;
    desc: string;
    category: string;
    buttonDisable?: boolean;
}

export default function CardComponent({title,desc,category,buttonDisable=false,id}:Props) {
    const router = useRouter()
    return (
        <Card>
            <CardHeader className="h-[160px] flex-row justify-center p-0 space-y-0 bg-gradient-to-r from-teal-500 to-pink-500">
                <Image 
                className="object-contain w-auto h-auto"
                src={'/learning.png'} 
                alt={""} 
                width={200} 
                height={200}
                />
            </CardHeader>
            <CardContent className="mt-4 space-y-1">
                <CardTitle>{title}</CardTitle>
                <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 inline-block">{category}</div >
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem!</CardDescription>    
            </CardContent>
            <CardFooter>
                <Button 
                onClick={()=>router.push(`/class/${id}`)}
                className="w-full"
                disabled={buttonDisable}
                >
                    Masuk
                </Button>
            </CardFooter>
        </Card>
    )
}