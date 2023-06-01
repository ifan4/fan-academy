'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Header from './header'


export default function Home() {
 const router = useRouter()

  return (
    <main className="sm:container">
      <Header/>
      <div className='grid grid-cols-2 gap-4 items-center content-center'>
        <div className='space-y-4'>
          <h3 className='text-2xl'>Make learn easier with Fan Academy</h3>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aspernatur adipisci doloribus tempora. Quo, corrupti.</p>
          <Button className='mt-2' onClick={()=>router.push('/class')}>Start Now</Button>
        </div>
        <div className=''>
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
