'use client'
import Header from "@/app/header";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster"



interface Props{
    children: React.ReactNode;
  }

export default function Layout({children}:Props) {

    return(
        <>
            <Header/>
            {children}
            <Toaster/>
        </>
    )
}