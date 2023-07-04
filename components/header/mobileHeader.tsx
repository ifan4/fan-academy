import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LucideMenu, Home, School2, User2,ArrowDownWideNarrow, Heading1 } from 'lucide-react'
import { ReactNode } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { DropdownMenuUser, DropdownTheme } from "@/app/header"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Icons } from "../icons"

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
            <Link href="/" passHref>
                <Image 
                className="col-span-3"
                src={'/Logo-Fan-Academia.png'}
                width={150}
                height={17}
                alt={"Fan Academy"}
                priority={true}         
                />
            </Link>
            <Sheet modal={false}>
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
                                <li className="p-1 rounded-xl list-none font-semibold text-md m-1 mt-3 bg-teal-600 text-center" role="button">
                                    <span className="w-max">Login</span>
                                </li>
                            </Link>
                            <Link href={'/auth/register'}>
                                <li className="p-1 rounded-xl list-none font-semibold text-md m-1 mt-3 outline outline-2 outline-teal-600 text-center" role="button">
                                    <span className="w-max">Register</span>
                                </li>
                            </Link>
                        </>
                        :
                        <DropdownMenuUser name={session.user?.name} email={session?.user?.email}/>
                    }
                    <div className="flex justify-evenly mt-7">
                        <DropdownTheme/>
                        <a href="https://github.com/ifan4/fan-academy" target="_blank" rel="noreferrer">
                            <Icons.gitHub
                            className="h-5 w-5 opacity-60 hover:opacity-100" role="button"
                            />
                        </a>
                    </div>
                    

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
                } p-2 list-none font-semibold text-md grid grid-cols-4 gap-2 items-center m-1
            `}
            role="button"
            >
                {
                    icon &&
                    <span className="flex justify-center items-center rounded-lg bg-teal-600 p-1 w-5 h-5">
                        {icon}
                    </span>
                }
                <span className="w-max">{title}</span>
            </li>
        </Link>
    )
}

