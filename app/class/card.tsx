'use client'

import { BellRing, Check } from "lucide-react"
import { cn } from "@/lib/utils"
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
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem!</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                <BellRing />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                        Push Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                        Send notifications to device.
                        </p>
                    </div>
                </div>
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