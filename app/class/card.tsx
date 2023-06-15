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
    buttonDisable?: boolean;
}

export default function CardComponent({title,desc,buttonDisable=false,id}:Props) {
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
            <CardContent className="grid gap-4 mt-4">
                <CardTitle>{title}</CardTitle>
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