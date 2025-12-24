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
import { UpdateUserPassword } from './_action/updatePassword.action'
import toast from 'react-hot-toast'

//schema validation
const formSchema = z.object({
    currentPassword: z.string().nonempty('Current Password is Required'),
    password: z.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain 8 Characters , At least one uppercase, one lowercase, one digit and one special character'),
    rePassword: z.string().nonempty('Repassword is Required'),

}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: 'Password and Repassword are not the same' })

export default function UpdatePassword() {

    //handling loading
    const [isLoading, setIsLoading] = useState(false)

    //handling error
    const [apiError, setApiError] = useState(null)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: "",
        },
    })

    //programatic routing 
    const router = useRouter()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        //api call (server action)
        const data = await UpdateUserPassword(values)
        setIsLoading(false)
        if (data.token) {
            toast.success('Password Updated Successfully')
            router.push('/login')
        } else {
            setApiError(data.message)
        }
        // if (data.token !== null) {
        //     toast.success('Password Updated Successfully')
        //     router.push('/login')
        // } else {
        //     setApiError(data.message)
        // }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center min-h-[75vh]'>
                <h1 className='text-2xl my-3'>Change Your Password</h1>
                <Card className='p-5 w-sm'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Abdo@123" {...field} />
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
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Abdo@123" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rePassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RePassword</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Abdo@123" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='w-full cursor-pointer bg-main' type="submit">{isLoading ? <Loader className='animate-spin' /> : "Submit"}</Button>
                            {apiError && <div className='text-red-800 capitalize text-center'>{apiError}</div>}
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    )
}
