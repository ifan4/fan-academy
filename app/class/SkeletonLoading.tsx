'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {
                skeletons.map((key:string)=>(
                    <Card key={key}>
                        <Skeleton className="h-28 w-full" />
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-4 w-full" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-3 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-6 w-full" />
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
        
    )
}

const skeletons = Array.from({ length: 12 }).map(
    (_, i, a) => `Skeleton yang ke-${a.length - i}`
  )