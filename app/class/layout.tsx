'use client'
import Header from "@/app/header";
import { Suspense } from "react";
import { useSession } from "next-auth/react";




interface Props{
    children: React.ReactNode;
  }

export default function Layout({children}:Props) {

    return(
        <>
            <Header/>
            {children}
        </>
    )
}