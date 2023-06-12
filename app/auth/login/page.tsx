'use client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { signIn, useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface IProps {
    searchParams?: { [key: string]: string | string[] | undefined };
  }

export default function Login({ searchParams }: IProps) {
    const { data:session } = useSession()
    const router = useRouter();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [status,setStatus] = useState<'success' | 'failed'>()
    const [errorMessage, setErrorMessage] = useState<null | string>()
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const message:any= searchParams?.message
        setErrorMessage(message)
        const status:any= searchParams?.status
        setStatus(status)
    },[searchParams?.message])

    useEffect(()=> {
        if (session)router.push('/')
    },[session])

    

    const onSubmitHandler = async (e:any)=>{
        e.preventDefault()
        setLoading(true)
        const result:any = await signIn("credentials", {
            email: email,
            password: password,
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
        <form 
        className="sm:container lg:w-1/4 p-8 mt-7"
        onSubmit={onSubmitHandler}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-xl">Sign In</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {
                        errorMessage 
                        &&  <Alert variant={status == 'success'? 'default' : 'destructive'}>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                { errorMessage }
                                </AlertDescription>
                            </Alert>
                    }
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                        type="email" 
                        name="email" 
                        placeholder="email"
                        onChange={(e:any)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={(e:any)=>setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="block">
                    <Button className="w-full">
                    {
                        !loading 
                        ? 'Login'
                        : 'Loading..'
                    }
                    </Button>
                    <div className="mt-8 text-center">
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
                </CardFooter>
            </Card>
        </form>
    )
}
