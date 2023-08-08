'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Header from "../header"
import { FaqData,faqType  } from "./data"


export default function Faq() {
    return(
        <>
            <Header/>
            <div className="px-5 lg:px-0">
                <h3 className="scroll-m-20 mb-5 text-center text-xl font-extrabold tracking-tight lg:text-3xl">Frequently Ask Question (FAQ)</h3>
                <div>
                    {
                        FaqData.map((data:faqType,key:number)=>(
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>{data.title}</AccordionTrigger>
                                    <AccordionContent>{data.description}</AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))
                    }
                    
                </div>
            </div>

        </>
    )
}