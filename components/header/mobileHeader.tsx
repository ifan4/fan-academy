import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LucideMenu, Home, School2, User2,ArrowDownWideNarrow } from 'lucide-react'
import { ReactNode } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { DropdownMenuUser } from "@/app/header"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface component{
    title: string; 
    href: string;
    icon?: ReactNode
}

const components:component[] = [
    {
        title: 'Home',
        href: '/',
        icon: <Home/>
    },
    {
        title: 'Class',
        href: '/class',
        icon: <School2/>
    },
    // {
    //     title: 'Category',
    //     href: '/category',
    //     icon: <ArrowDownWideNarrow/>
    // },
    {
        title: 'About Us',
        href: '/aboutUs',
        icon: <User2/>
    },

]


export function MobileHeader() {
    const {data:session} = useSession()
    

    return (
        <div className="flex border-b-2 p-3 sticky top-0 backdrop-blur-sm items-center justify-between px-7 lg:px-3">
            <Link href="/">
                <Image 
                className="col-span-3"
                src={'/logo-no-bg.png'}
                width={150}
                height={150} alt={"Fan Academy"}                        
                />
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="right-0">
                        <LucideMenu/>
                    </Button>
                </SheetTrigger>
                <SheetContent position="right" size="lg">
                    {
                        components.map((component,key)=>(
                            <ListItem
                            key={key}
                            title={component.title}
                            icon={component.icon}
                            href={component.href}
                            />
                        ))
                    }
                    {
                        !session 
                        ? 
                        <>
                            <Link href={'/auth/login'}>
                                <li className="p-1 rounded-xl list-none font-semibold text-lg m-1 mt-3 bg-teal-600 text-center" role="button">
                                    <span className="w-max">Login</span>
                                </li>
                            </Link>
                            <Link href={'/auth/login'}>
                                <li className="p-1 rounded-xl list-none font-semibold text-lg m-1 mt-3 outline outline-2 outline-teal-600 text-center" role="button">
                                    <span className="w-max">Register</span>
                                </li>
                            </Link>
                        </>
                        :
                        <DropdownMenuUser displayName={session.user?.name}/>
                    }
                    

                </SheetContent>
            </Sheet>
        </div>
    )
}


const ListItem = ({title,icon,href}:component) => {
    const pathname = usePathname()

    return( 
        <Link href={href}>
            <li 
            
            className={`
                ${
                    pathname === href
                    ? "rounded-xl bg-muted font-bold dark:text-white text-slate-950"
                    : "hover:bg-transparent hover:underline"
                } p-2 list-none font-semibold text-lg grid grid-cols-4 gap-2 items-center m-1
            `}
            role="button"
            >
                {
                    icon &&
                    <span className="flex justify-center items-center rounded-lg bg-teal-600 p-1 w-6 h-6">
                        {icon}
                    </span>
                }
                <span className="w-max">{title}</span>
            </li>
        </Link>
    )
}

