'use client'

import { UserNav } from "./navigasi";
import { Sidebar } from "./sidebar";
import { ReactNode } from "react";

interface Props{
    children: ReactNode
}

export default function Admin({children}:Props) {


    return(
        <div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Admin Dashboard
                        </h2>
                        <p className="text-muted-foreground w-[600px]">
                        Take charge of the fan learning experience with Fan-Academy&apos;s powerful Admin Page. Customize, manage, and make an impact.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <UserNav />
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-5">
                <Sidebar className="hidden lg:block"/>
                <div className="col-span-3 lg:col-span-4 lg:border-l">
                    <div className="h-full px-4 py-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}