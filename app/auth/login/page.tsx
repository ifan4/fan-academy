'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/react-hook-form/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchers } from "@/lib/fetchers"
import { error } from "@/types/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Loader2 } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


interface IProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}

const registerScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

type RegisterValues = z.infer<typeof registerScheme>

export default function Login({ searchParams }: IProps) {
    const { data:session } = useSession()
    const router = useRouter()
    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerScheme)
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [status,setStatus] = useState<'success' | 'failed'>()
    const [errorMessage, setErrorMessage] = useState<null | string>()
    

    useEffect(()=>{
        const message:any= searchParams?.message
        setErrorMessage(message)
        const status:any= searchParams?.status
        setStatus(status)
    },[searchParams?.message])

    useEffect(()=> {
        if (session)router.push('/')
    },[session])

    

    const onSubmit = async(values:RegisterValues) => {
        setLoading(true)
        const result:any = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: '/'
        })
        setLoading(false)
        
        if (result?.error) {
            if (result.status >= 400 && result.status < 500 ) {
                setErrorMessage('Invalid Email or Password')
            }
            else {
                setErrorMessage('Something Wrong...')
            }
            console.log(result);
        }
        else{
            setErrorMessage('')
            return router.push('/');
        }
    }

    if (!session) return(
        <Form {...form}>
            <form
            className="lg:w-1/3 p-8 mt-7 lg:mx-auto border rounded-xl space-y-2 mx-5 bg-white dark:bg-transparent"
            onSubmit={form.handleSubmit(onSubmit)}
            >
                <h3 className="text-center text-xl">Login</h3>
                {
                    errorMessage 
                    &&  <Alert variant={status == 'success'? 'default' : 'destructive'}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                            { errorMessage }
                            </AlertDescription>
                        </Alert>
                }
                <FormField
                name="email"
                control={form.control}
                render={ ( {field} ) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@gmail.com" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                ) }
                />
                <FormField
                name="password"
                control={form.control}
                render={ ( {field} ) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="******" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                ) }
                />
                <div>
                    <Button className="w-full mt-4">
                    {
                        !loading 
                        ? 'Login'
                        : 'Loading..'
                    }
                    </Button>
                    <div className="mt-3 text-center">
                        New to Fan-Academy?
                        <span 
                        className="ml-2 text-teal-600 hover:text-teal-800"
                        role="button"
                        >
                            <Link href={'/auth/register'}>
                                Sign Up
                            </Link>
                        </span> 
                    </div>
                </div>
            </form>
        </Form>
    )
}