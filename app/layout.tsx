'use client'
import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Toaster } from "@/components/ui/toaster"
// import { persistor } from '@/globalState/store'
import Provider from '@/globalState/Provider'
import { changeToDark, changeToLight } from '@/globalState/themeReducer'
import { PersistGate } from 'redux-persist/integration/react'
import { store, useAppSelector } from '@/globalState/store'
import { persistStore } from 'redux-persist'
const jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'] })
export const metadata = {
  title: 'Fan-Academy',
  description: 'Generated by create next app',
}
interface Props{
  children: React.ReactNode;
  session: any
}

let persistor = persistStore(store)

export default function RootLayout({children,session}:Props) {
  const [theme,setTheme] = useState<'dark'|'light'>()
  const Body = () => {
    const themeG:'light'|'dark' = useAppSelector(state=>state.theme.name)
    setTheme(themeG)

    

    return(
      <body className={`${theme} ${jakarta_sans.className} transition ease-linear delay-75`}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <Toaster/>
    </body>
    )
  }
  
  return (
    <Provider>
      {/* <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}> */}
    
      <html lang="en">
        <Head>
          <meta http-equiv="Permissions-Policy" content="interest-cohort=()"></meta>
        </Head>

        <Body/>

      </html>
      {/* </PersistGate> */}
    </Provider>
  )
}
