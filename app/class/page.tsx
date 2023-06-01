'use client'
import CardComponent from './card'
import useSWR from 'swr';
import Loading from './SkeletonLoading';
import { useEffect } from 'react';
import { fetcher } from '@/lib/fetchers';
import { class_type } from '@/types/interfaces';



export default function ClassPage() {
    const { data, isLoading, error } = useSWR('/class', fetcher)
    if (error) throw new Error(error)
    

    return(
        <div className="sm:container mt-3 p-3">
            <div className="mb-4">
                <h3 className="text-xl font-bold">Katalog Kelas</h3>
                <p className="text-sm tracking-widest w-1/3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus molestiae quia commodi eos?
                </p>
            </div>
            {
                isLoading && (
                    <Loading/>
                )
            }
            <div className="grid grid-cols-4 gap-4">
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


