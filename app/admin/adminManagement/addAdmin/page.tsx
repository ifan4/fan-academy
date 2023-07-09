'use client'

import AddAdminForm from './form'
import { useSession } from 'next-auth/react'


export default function AddAdmin() {
    const {data:session} = useSession() 
    
    

    return(
        <>
            <AddAdminForm/>
        </>
    )
}