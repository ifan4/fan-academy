'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Header from './header'
import { Comfortaa } from 'next/font/google'
import {MobileHeader} from '@/components/header/mobileHeader'
import { School2 } from 'lucide-react'
import { useState } from 'react'

const comfortaa = Comfortaa({ subsets: ['latin'] })

export default function Home() {
 const router = useRouter()

  return (
    <main className="pb-10">
      <Header/>
      {/* <MobileHeader/> */}
      <div className='text-center space-y-4 py-16 lg:mt-20'>
          <h3 className={`text-xl lg:text-4xl font-bold ${comfortaa.className}`}>Make learning easier with Fan Academy</h3>
          <p className='text-sm lg:text-xl'>
            Fuel your passion, elevate your knowledge. Join our interactive course platform for enthusiasts worldwide.
            {/* Welcome to Fan-Academy, the ultimate destination for enthusiasts looking to dive deep into their favorite subjects. With a wide range of courses available, Fan-Academy offers a unique learning experience tailored to meet the needs of every fan. Join our community today and embark on an exciting educational journey that will elevate your understanding and connect you with like-minded enthusiasts from around the world. */}
          </p>
          <Button size={'lg'} className='mt-2' onClick={()=>router.push('/class')}>Start Now</Button>

        {/* <div className='h-10/12 w-full lg:w-1/3 flex justify-center'>
          <Image 
          src={'/learning.png'}
          width={450}
          height={450} alt={"Fan Academy"}                        
          />
        </div> */}
      </div>

      <div className='mt-10'>
        <h3 
        className={`text-center scroll-m-20 text-2xl font-bold tracking-tight ${comfortaa.className}`}
        >
          OUR FEATURES:
        </h3>
        <div className='grid lg:grid-cols-3 gap-4 lg:gap-7 mt-7 px-5 lg:px-0'>
          <Feature 
          title='Interactive Course' 
          desc='Engaging learning with multimedia content, videos, and interactive exercises. Explore your favorite subjects like never before.'
          />
          <Feature 
          title='Quizzes in Each Chapter' 
          desc='Test your knowledge, track progress. Chapter-specific quizzes that reinforce learning and keep you motivated.'
          />
          <Feature 
          title='FindGuru' 
          desc='Connect with expert teachers. Get guidance, ask questions, and be part of a supportive community at Fan-Academy.'
          comingSoon={true}
          />
        </div>
      </div>
    </main>
  )
}

const Feature = ({title,desc, comingSoon=false}:{title:string,desc:string, comingSoon?:boolean})=> {
  const [hovered, setHovered] = useState<boolean>(false)

  return(
    <div
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className={`transition ease-in-out ${hovered && 'scale-105'} text-center space-y-4 border dark:border-teal-500 rounded-xl p-8 hover:bg-accent`}
    >
      <h5 
      className={`inline scroll-m-20 text-2xl font-semibold tracking-tight relative`}
      >
        {title}
        {
          comingSoon 
          && <span className='text-xs text-white absolute -right-10 -top-2 bg-teal-700 rounded px-1 opacity-75'>Coming Soon</span> 
        }
      </h5>
      <p 
      className={`text-sm ${hovered ? '' : 'text-muted-foreground'}`}
      >
        {desc}
        </p>
    </div>
  )
}
