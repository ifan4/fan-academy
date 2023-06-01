'use client'
import { getCsrfToken, useSession } from "next-auth/react"
import { useEffect } from "react"


export default async function MyData() {
    const {data:session} = useSession()
    


    
    return(
        <div className="w-1/2">
            <h2 className='text-2xl'>My Data Page </h2>
            <p className='bg-red-500 break-words'>
                {JSON.stringify(session?.user)}
            </p>
        </div>
    )
}