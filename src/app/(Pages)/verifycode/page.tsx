"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { VerifyResetCode } from "./_action/verifyCode.action"
import { Loader } from "lucide-react"



//schema for validation
const FormSchema = z.object({
    resetCode: z.string().min(6, {
        message: "Your one-time code must be 6 characters.",
    }),
})


export default function VerifyCode() {

    //handling loading
    const [isLoading, setIsLoading] = useState(false)

    //handling error
    const [apiError, setApiError] = useState(null)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            resetCode: "",
        },
    })

    //programatic routing 
    const router = useRouter()

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        setIsLoading(true)
        //api call (server action)
        const data = await VerifyResetCode(values)
        setIsLoading(false)
        if (data.status === 'Success') {
            router.push('/resetpassword')
        } else {
            setApiError(data.message)
        }
    }


    return (
        <>
            <div className='min-h-[75vh] flex justify-center items-center text-center'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="resetCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One-Time Code</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the one-time code sent to your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="cursor-pointer bg-main w-full" type="submit">{isLoading ? <Loader className='animate-spin' /> : "Submit Code"}</Button>
                        {apiError && <div className='text-red-800 capitalize text-center'>{apiError}</div>}
                    </form>
                </Form>
            </div>
        </>
    )
}
