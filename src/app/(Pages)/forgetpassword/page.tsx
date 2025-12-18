'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { SendCode } from './_action/forgetPassword.action'

//schema validation
const formSchema = z.object({
    email: z.string().nonempty('Email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),
})

export default function ForgetPassword() {

    //handling loading
    const [isLoading, setIsLoading] = useState(false)

    //handling error
    const [apiError, setApiError] = useState(null)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    })

    //programatic routing 
    const router = useRouter()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        //api call (server action)
        const data = await SendCode(values)
        setIsLoading(false)
        if (data.statusMsg === 'success') {
            router.push('/verifycode')
        } else {
            setApiError(data.message)
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center min-h-[75vh]'>
                <h1 className='text-2xl my-3'>Enter Your Email Account</h1>
                <Card className='p-5 w-sm'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Abdo@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='w-full cursor-pointer bg-main' type="submit">{isLoading ? <Loader className='animate-spin' /> : "Send Code"}</Button>
                            {apiError && <div className='text-red-800 capitalize text-center'>{apiError}</div>}
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    )
}
