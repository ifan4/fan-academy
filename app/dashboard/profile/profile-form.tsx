"use client"
 
import Link from "next/link"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/react-hook-form/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { fetcherWithToken } from "@/lib/fetchers";
import { useEffect, useMemo } from "react";

const formSchema = z.object({
    first_name: z.string().min(2, {
        message: "First Name must be at least 2 characters.",
    }),
    last_name: z.string().optional(),
    nisn: z.string().min(10, {
        message: 'Invalid NISN'
    }),
    email: z.string().email(),
    date_of_birth: z.date({
        required_error: "A date of birth is required.",
      }),
  })


export default function ProfileForm(){
    const { data:session } = useSession()
    const { data, isLoading, error } = useSWR(
        //@ts-ignore
        ['/profile/me', session?.user?.accessToken],
        ([url,accessToken])=> fetcherWithToken(url,accessToken)
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    useMemo(()=>{

        console.log('date format');
        
        console.log(new Date(data?.data.date_of_birth) );
        
        form.setValue('first_name',data?.data.first_name)
        form.setValue('last_name',data?.data.last_name)
        form.setValue('nisn',data?.data.nisn)
        form.setValue('email',data?.data.email)
        form.setValue('date_of_birth',new Date(data?.data.date_of_birth))
    },[data])

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    if (isLoading) return <div>Loading...</div>

    return(
        <>
            <Form {...form}>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nisn"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>NISN</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="nisn" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Date of birth</FormLabel>
                    <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                            )}
                            >
                                {field.value ? (
                                format(field.value, "PPP")
                                ) : (
                                <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

                <Button type="submit">Update account</Button>
                </form>
            </Form>
        </>
    )
}