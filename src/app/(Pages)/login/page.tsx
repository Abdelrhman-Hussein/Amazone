"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import {signIn} from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

//schema for validation
const formSchema = z.object({
    email: z.string().nonempty('Email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),
    password: z.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain 8 Characters , At least one uppercase, one lowercase, one digit and one special character'),
})

export default function Login() {

    //handling loading
    const [isLoading, setIsLoading] = useState(false)

    //catch the error from url
    const searchParams = useSearchParams()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const response = await signIn('credentials',{
            email:values.email,
            password:values.password,
            callbackUrl:'/products',
            redirect:true
        })
        setIsLoading(false)
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center min-h-[75vh]'>
                <h1 className='my-3 text-2xl'>Login Now</h1>
                <Card className='p-5 w-sm shadow-2xl'>
                    <Form {...form}>
                        {/* catch errors and show it */}
                        {searchParams.get('error') && <h2 className='text-red-800 text-center'>{searchParams.get('error')}</h2>}
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='w-full cursor-pointer bg-main' type="submit">{isLoading ?<Loader className='animate-spin'/> :"Login"}</Button>
                        </form>
                    </Form>
                    <div className='text-center'>
                        <Link className='text-blue-800 hover:underline' href={'/forgetpassword'}>
                            Forget Your Password ? 
                        </Link>
                        Again!!!!!!😠
                    </div>
                    <div>If you don't have account, please <Link className='text-blue-700 underline text-center' href={'/register'}>SignUp</Link> Now</div>
                </Card>
            </div>
        </>
    )
}
