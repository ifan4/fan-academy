"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react"
import {
    CreditCard,
    LogOut,
    User,
    Moon,
    Sun
  } from "lucide-react"
  import { Icons } from "@/components/icons"
  import { useDispatch } from "react-redux";
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { MobileHeader } from "@/components/header/mobileHeader"
import { usePathname } from "next/navigation"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { changeToDark, changeToLight } from "@/globalState/themeReducer"
// import { useAppSelector } from "@/globalState/store"
import useDeviceSize from "@/lib/helper"
import { useAppSelector } from "@/globalState/store"
type Checked = DropdownMenuCheckboxItemProps["checked"]

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Frontend Development",
        href: '#',
        description:
        "Creating the visual and interactive parts of websites using HTML, CSS, and JavaScript.",
    },
    {
        title: "Backend Development",
        href: "#",
        description:
        "Building the behind-the-scenes functionality of websites or web applications using servers, databases, and application logic.",
    },
    {
        title: "Full Stack Development",
        href: "#",
        description:
        "Handling both frontend and backend development for complete web solutions.",
    },
    {
        title: "Programming Fundamental",
        href: "#",
        description: "Covering essential programming concepts applicable to multiple languages.",
    },
    {
        title: "Desain",
        href: "#",
        description: "Focusing on visual design and user experience (UI/UX) principles for websites and digital products.",
    },
    {
        title: "Others",
        href: "#",
        description:
        "Miscellaneous topics that don't fit into the other categories.",
    }
]

export default function Header() {
    const {data:session} = useSession()
    const pathname = usePathname()
    const [width, height] = useDeviceSize();

    if (width !== undefined ) {
        if (width <= 1024){
            return <MobileHeader/>
        }
    }


    return (
        <div className="lg:flex py-8 items-center justify-between hidden px-3">
            <Link href="/" legacyBehavior passHref role="button">
                <Image 
                src={'/logo-no-bg.png'}
                width={150}
                height={150} alt={"Fan Academy"}                        
                />
            </Link>
            <NavigationMenu>
                <NavigationMenuList>
                    
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink 
                            className={`
                            ${navigationMenuTriggerStyle()}
                            ${pathname == '/' && 'bg-teal-600 dark:bg-accent text-white dark:text-accent-foreground'}
                            `}
                            >
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/class" legacyBehavior passHref>
                        <NavigationMenuLink 
                        className={`
                            ${navigationMenuTriggerStyle()}
                            ${pathname?.startsWith('/class') && 'bg-teal-600 dark:bg-accent text-white dark:text-accent-foreground'}
                        `}>
                        Class
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Category</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                                >
                                {component.description}
                                </ListItem>
                            ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink 
                            className={navigationMenuTriggerStyle()}
                            >
                                About Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex">
                {
                    !session?.user 
                    ?  <Link href="/auth/login" legacyBehavior passHref>   
                            <Button>
                                Login
                            </Button>
                        </Link>
                
                    : <DropdownMenuUser displayName={session.user.email}/>
                }
                <div className="flex items-center border-l border-slate-600 space-x-4 ml-6 pl-6 dark:border-slate-400">
                
                        <DropdownTheme/>
        
                        <a href="https://github.com/ifan4/fan-academy" target="_blank" rel='noreferrer'>
                            <Icons.gitHub
                            className="h-5 w-5 opacity-60 hover:opacity-100" role="button"
                            />
                        </a>
                </div>
            </div>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
            <a
            ref={ref}
            className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
            )}
            {...props}
            >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
            </a>
    )
})
ListItem.displayName = "ListItem"




export function DropdownMenuUser({displayName}:{displayName?:string |null }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full lg:w-auto">
                    Sign In as &nbsp;
                    <span className="text-sm underline decoration-pink-500 font-medium leading-none">{displayName}</span>
                </Button>
            </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href={'/dashboard/profile'}>
                            <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link href={'/dashboard'}>
                            <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>My Dashboard</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem role="button" onClick={()=>signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    )
}


export const DropdownTheme = () => {
    const dispatch = useDispatch()
    const themeName = useAppSelector(state => state.theme.name) 
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {
                    themeName == 'light'
                    ? <Sun 
                    className="opacity-60 hover:opacity-100" role="button"
                    />
                    : <Moon 
                    className="opacity-60 hover:opacity-100" role="button"
                    />
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                className={`${themeName === 'dark' && 'text-teal-500'}`}
                onClick={()=>dispatch(changeToDark())}
                >
                    <Moon className="mr-2 h-4 w-4"/>
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                className={`${themeName === 'light' && 'text-teal-500'}`}
                onClick={()=>dispatch(changeToLight())}
                >
                    <Sun className="mr-2 h-4 w-4"/>
                    <span>Light</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}