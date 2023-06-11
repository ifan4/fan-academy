'use client'

import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { SidebarNav } from "./SideBarNav";
import Header from "../header";

const sidebarNavItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
    },
]

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({children}:Props) {
    

    return(
        <div className="sm:container">
            <Header/>
            <div className="space-y-6 p-10 pb-16 block border lg:min-h-[600px]">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                <div className="flex-1 w-full">
                    {children}
                </div>
                </div>
            </div>
        </div>
    )


}