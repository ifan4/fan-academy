'use client'
import CardComponent from './card'
import useSWR from 'swr';
import Loading from './skeletonLoading';
import { useEffect } from 'react';
import { fetcher } from '@/lib/fetchers';
import { class_type } from '@/types/interfaces';
import { Comfortaa } from 'next/font/google'

const comfortaa = Comfortaa({ subsets: ['latin'] })


export default function ClassPage() {
    const { data, isLoading, error } = useSWR('/class', fetcher)
    // if (error) throw new Error(error)
    

    return(
        <div className="sm:container mt-3 p-3 px-7 lg:px-3">
            <div className="mb-4">
                <h3 className={`text-2xl font-bold ${comfortaa.className}`}>Class Catalogue</h3>
                <p className="text-sm tracking-widest w-full lg:w-1/3">
                    Discover endless learning possibilities with Fan-Academy&apos;s Class Catalogue. Explore, learn, grow.
                </p>
            </div>
            {
                isLoading && (
                    <Loading/>
                )
            }
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-4">
                {
                    data && data?.data?.map((d:class_type,key:string)=>(
                        <CardComponent key={d.id} id={d.id} title={d.name} desc={d.description}/>
                    ))
                }

                {
                    data &&
                    <>
                        <CardComponent title='lorem ipsum dolor' buttonDisable={true} desc={'lorem ipsum dolor sit amet conspectum'} id={''}/>
                        <CardComponent title='lorem ipsum dolor' buttonDisable={true} desc={'lorem ipsum dolor sit amet conspectum'} id={''}/>
                        <CardComponent title='lorem ipsum dolor' buttonDisable={true} desc={'lorem ipsum dolor sit amet conspectum'} id={''}/>
                        <CardComponent title='lorem ipsum dolor' buttonDisable={true} desc={'lorem ipsum dolor sit amet conspectum'} id={''}/>
                    </>
                }
                
                
                
            </div>
        </div>
    )
}


