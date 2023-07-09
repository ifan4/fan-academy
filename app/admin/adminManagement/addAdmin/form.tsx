'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/react-hook-form/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import { 
    Loader2
} from "lucide-react";
import { fetchers } from "@/lib/fetchers";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { fetcherWithToken } from '@/lib/fetchers'
import useSWR from 'swr'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { user } from "@/types/interfaces";


const formSchema = z.object({
    user: z.object({
        id: z.any(),
        email: z.string().email()
    })
})


export default function AddAdminForm(){
    const {data:session} = useSession()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()

    const {data:users, isLoading:isUsersLoading, error} = useSWR(
        //@ts-ignore
        ['/users', session?.user?.accessToken],
        ([url,accessToken]) => fetcherWithToken(url,accessToken)
    )



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    
    

    const onSubmit = async(values:z.infer<typeof formSchema>)=> {
        setIsLoading(true)
        try {
            const changeTo = await fetchers('/admins/changeTo',{
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json', 
                    'Accept': 'application/json',
                    //@ts-ignore
                    Authorization: 'Bearer ' + session?.user?.accessToken,
                },
                body: JSON.stringify({
                    user_id: values.user.id,
                    changeTo: 'admin'
                })
            })

            toast({
                title: 'Success',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-teal-700 p-4">
                        <p className="text-white">Admin Added!</p>
                    </pre>
                )
            })

            return router.push('/admin/adminManagement')
        } catch (error) {
            
        } finally{
            setIsLoading(false)
        }
    }

    return(
        <>
            <Form {...form}>
                <form 
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>User</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value
                                ? users.find(
                                    (user:user) => user.id === field.value.id
                                )?.email
                                : "Select User"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput
                            placeholder="Search email..."
                            className="h-9"
                            />
                            <CommandEmpty>No email found.</CommandEmpty>
                            <CommandGroup>
                            { users && users.map((user:user) => (
                                <CommandItem
                                value={user.id}
                                key={user.id}
                                onSelect={(value) => {
                                    alert(JSON.stringify(user))
                                    form.setValue("user", {id: user.id, email: user.email})
                                }}
                                >
                                {user.email}
                                <CheckIcon
                                    className={cn(
                                    "ml-auto h-4 w-4",
                                    user.id === field?.value?.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                />
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        Select user to become an admin.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                    <Button 
                    type="submit"
                    >
                        {
                            isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        }
                        Empower as Admin
                    </Button>
                </form>
            </Form>
        </>
    )
}