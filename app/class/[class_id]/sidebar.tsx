'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { materi } from "@/types/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { PanelLeftOpen } from "lucide-react";
import { textTrunc } from "@/lib/helper";


export default function Sidebar({materis}:{materis:materi[]}) {
    const router = useRouter()
    const pathname = usePathname()
    

    return(
        <>
            <h3 className="text-xl font-semibold text-center pb-3">List Chapters</h3>
            <ScrollArea className="h-3/4 rounded-md border dark:bg-zinc-950">
                <div className="p-2 lg:p-4">
                    <Fragment>
                        {
                            materis &&
                            <Button 
                            onClick={()=>router.push(`/class/${materis[0]?.class_id}`)} className={cn(
                                buttonVariants({ variant: "ghost" }),
                                pathname === `/class/${materis[0]?.class_id}`
                                ? "bg-muted hover:bg-muted dark:text-white text-slate-950"
                                : "hover:bg-transparent hover:underline",
                                "text-sm py-8 w-full")}
                            >
                                Informasi Kelas
                            </Button>
                        }
                        <Separator className="my-2" />
                    </Fragment>
                    {materis?.map((materi:materi) => (
                    <Fragment key={materi.id}>
                        <Button 
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname === `/class/${materi.class_id}/${materi.id}`
                                ? "bg-muted hover:bg-muted dark:text-white text-slate-950"
                                : "hover:bg-transparent hover:underline",
                            "text-sm py-8 w-full")}
                        onClick={()=>router.push(`/class/${materi.class_id}/${materi.id}`)}
                        >
                            {textTrunc(materi.title,50)}
                        </Button>
                        <Separator className="my-2" />
                    </Fragment>
                    ))}
                </div>
            </ScrollArea>
        </>
    )
}


export const MobileSideBar = ({materis}:{materis:materi[]}) => {

    return(
        <Sheet>
            <SheetTrigger asChild>
                    <Button variant="secondary" className="">
                        <PanelLeftOpen className="mr-2"/> Open Chapters
                    </Button>
                </SheetTrigger>
                <SheetContent position="left" size="lg" className="px-2">
                    <Sidebar materis={materis}/>
                </SheetContent>
        </Sheet>
    )
}