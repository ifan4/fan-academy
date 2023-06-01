'use client'
import { useSession } from "next-auth/react"
import { useEffect } from "react"



export default function AuthenticatedPage() {
    const { data: session } = useSession()
    
    // useEffect(()=>{
    //     // console.log('Ini Use Effect USESESSION');
    //     // console.log(session);
        
        
    // },[session])
    

    return(
        <div>
            {
                session?.user
                ? (
                    <div>
                        <h3>Hello {session?.user.name}</h3>
                        <p>You can entry this page, because you are Authenticated user</p>
                    </div>
                )
                : (
                    <p>You not allowed to access this page, go away from here!!</p>
                )
            }
        </div>
    )
}