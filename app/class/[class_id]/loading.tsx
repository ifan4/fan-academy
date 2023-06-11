import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    


    return(
        <div className="flex w-full">
            <div className="xl:w-80 fixed h-screen hidden lg:block">
                <h3 className="text-xl font-semibold text-center pb-3">List Contents</h3>
                <div className="p-4 h-3/4 rounded-md border dark:bg-zinc-950 space-y-3">
                    {
                        skeletons.map((key:string)=><Skeleton className="text-sm py-8 w-full h-16"/>)
                    }
                </div>
            </div>
            <div className="lg:ms-80 p-4 lg:p-8 pt-4 w-full text-center lg:mt-16 mt-3">
                <div className="flex justify-center mb-8">
                    <Skeleton className="h-[400px] w-full lg:w-1/2 lg:h-96"/>       
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/12"/>
                    <hr />
                    <Skeleton className="h-4 w-full"/>
                     
                    <Skeleton className="h-4 w-3/4"/>
                </div>
            </div>
        </div>
    )
}

const skeletons = Array.from({ length: 8 }).map(
    (_, i, a) => `Skeleton yang ke-${a.length - i}`
  )