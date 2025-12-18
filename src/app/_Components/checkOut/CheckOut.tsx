'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Banknote, Loader } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { LiaCcVisa } from "react-icons/lia";
import { BsSafe2 } from "react-icons/bs";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function CheckOut({ cartId, token } : {cartId:string, token:string|undefined}) {

    //controlled component by useRef instead useState to avoid Renders 
    const detailsInput = useRef<HTMLInputElement | null>(null)
    const cityInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)

    //handling visa and cash loading
    const [isVisaLoading, setIsVisaLoading] = useState(false)
    const [isCashLoading, setIsCashLoading] = useState(false)
    
    //online && cash payment functions
    async function checkOutSession(){
        setIsVisaLoading(true)
        const shippingAddress={
            details:detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value,
        }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            {
                method:"POST",
                body:JSON.stringify({shippingAddress}),
                headers:{
                    token: token!,
                    'content-type': 'application/json'
                }
            }
        )
        const data = await response.json()
        if(data.status='success'){
            window.location.href=data.session.url
        }
        setIsVisaLoading(false)
    }
    async function cashPayment(){
        setIsCashLoading(true)
        const shippingAddress={
            details:detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value,
        }
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/'+cartId,
            {
                method:"POST",
                body:JSON.stringify({shippingAddress}),
                headers:{
                    token: token!,
                    'content-type': 'application/json'
                }
            }
        )
        const data = await response.json()
        console.log(data)
        if(data.status='success'){
            window.location.href ='http://localhost:3000/allorders'
        }
        setIsCashLoading(false)
    }

    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button className='w-full text-lg mt-4 cursor-pointer bg-main'>
                            <BsSafe2 />Procees to Checkout
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Shipping Address</DialogTitle>
                            <DialogDescription>
                                Make sure that you enter the correct Address's Details
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label>City</Label>
                                <Input ref={cityInput} id="city"/>
                            </div>
                            <div className="grid gap-3">
                                <Label>Details</Label>
                                <Input ref={cityInput} id="details"/>
                            </div>
                            <div className="grid gap-3">
                                <Label>Phone</Label>
                                <Input id="phone"/>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className='cursor-pointer' variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => checkOutSession()} className='cursor-pointer bg-main' type="submit">{isVisaLoading ? <Loader className='animate-spin'/> : <LiaCcVisa />}Visa</Button>
                            <Button onClick={() => cashPayment()} className='cursor-pointer bg-main' type="submit">{isCashLoading ? <Loader className='animate-spin' /> : <Banknote />}Cash</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}
