'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Header from './header'
import { Comfortaa } from 'next/font/google'
import {MobileHeader} from '@/components/header/mobileHeader'

const comfortaa = Comfortaa({ subsets: ['latin'] })

export default function Home() {
 const router = useRouter()

  return (
    <main className="sm:container">
      <Header/>
      {/* <MobileHeader/> */}
      <div className='flex flex-wrap-reverse lg:flex-row gap-10 lg:gap-4 items-center content-center w-screen lg:w-auto px-7 lg:p-0'>
        <div className='space-y-4'>
          <h3 className={`text-xl lg:text-3xl font-bold ${comfortaa.className}`}>Make learn easier with Fan Academy</h3>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aspernatur adipisci doloribus tempora. Quo, corrupti.</p>
          <Button className='mt-2' onClick={()=>router.push('/class')}>Start Now</Button>
        </div>
        <div className='h-10/12 w-full lg:w-auto flex justify-center'>
          <Image 
          src={'/learning.png'}
          width={450}
          height={450} alt={"Fan Academy"}                        
          />
        </div>
      </div>
    </main>
  )
}
