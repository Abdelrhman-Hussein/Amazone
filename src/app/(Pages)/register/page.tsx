'use client'
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
import { RegisterUser } from './_action/register.action'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

//schema validation
const formSchema = z.object({
  name:z.string().nonempty('Name is Required').min(3,'min length is 3 chars').max(20,'max length is 20 chars'),
  email: z.string().nonempty('Email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),
  password: z.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain 8 Characters , At least one uppercase, one lowercase, one digit and one special character'),
  rePassword: z.string().nonempty('Repassword is Required'),
  phone: z.string().nonempty('Phone Number is Required').regex(/^20\d{10}$/,'Phone Number must begin with 20 and has 10 digits')

}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: 'Password and Repassword are not the same' })

export default function Register() {

  //handling loading
  const [isLoading, setIsLoading] = useState(false)

  //handling error
  const [apiError, setApiError] = useState(null)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
  })

  //programatic routing 
  const router = useRouter()

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    //api call (server action)
    const data = await RegisterUser(values)
    setIsLoading(false)
    if(data.message === 'success'){
      router.push('/login')
      toast.success('Email created successfully')
    }else{
      setApiError(data.message)
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-[75vh]'>
        <h1 className='text-2xl my-3'>Register Now</h1>
        <Card className='p-5 w-sm'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Abdo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="201001001000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full cursor-pointer bg-main' type="submit">{isLoading ? <Loader className='animate-spin' /> : "Register"}</Button>
              <div className='text-center'>Already have an Account? please, <Link className='text-blue-700 underline text-center' href={'/login'}>Login</Link></div>
              {apiError && <div className='text-red-800 capitalize text-center'>{apiError}</div>}
            </form>
          </Form>
        </Card>
      </div>
    </>
  )
}
