'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/react-hook-form/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchers } from "@/lib/fetchers"
import { error } from "@/types/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerScheme = z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2).optional(),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6)
}).superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['password_confirmation']
      });
    }
  })

type RegisterValues = z.infer<typeof registerScheme>

export default function Register() {
    const { data:session } = useSession()
    const router = useRouter()
    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerScheme)
    })
    const [isRegistering, setIsRegistering] = useState<boolean>(false)
    const [error,setError] = useState<error>()
    
    useEffect(()=> {
        if (session)router.push('/')
    },[session])

    const onSubmit = async(values:RegisterValues) => {
        setIsRegistering(true)
        try {
            const res = await fetchers(`/authentication/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password,
                    password_confirmation: values.password_confirmation
                })
            })
            console.log('res trycatch');
            console.log(res);
            
            return router.push('/auth/login?message=You successfuly sign up, please login&status=success')
        } catch (error:any) {
            console.log(error);
            
            setError({
                message: error.message,
                status: error.status
            })
        } finally {
            setIsRegistering(false)
        }
    }

    if (!session) return(
        <Form {...form}>
            <form
            className="lg:w-1/3 p-8 mt-7 lg:mx-auto border rounded-xl space-y-2 mx-5 bg-white dark:bg-transparent"
            onSubmit={form.handleSubmit(onSubmit)}
            >
                <h3 className="text-center text-xl">Register</h3>
                {
                    error &&
                    <Alert variant={'destructive'}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                        { error.message }
                        </AlertDescription>
                    </Alert>
                }
                <FormField
                name="first_name"
                control={form.control}
                render={ ( {field} ) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your first name" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                ) }
                />
                <FormField
                name="last_name"
                control={form.control}
                render={ ( {field} ) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your last name" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                ) }
                />
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
                <FormField
                name="password_confirmation"
                control={form.control}
                render={ ( {field} ) => (
                    <FormItem>
                        <FormLabel>Password Confirmation</FormLabel>
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
                            isRegistering && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        }
                        Sign Up
                    </Button>

                    <div className="mt-3 text-center">
                        Already have an account?
                        <span 
                        className="ml-2 text-teal-600 hover:text-teal-800"
                        role="button"
                        >
                            <Link href={'/auth/login'}>
                                Log in
                            </Link>
                        </span> 
                    </div>
                </div>
            </form>
        </Form>
    )
}