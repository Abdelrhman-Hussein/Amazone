'use client'
import { getUserToken } from '@/app/Helpers/getUserToken';
import { AddressDetailsI, AddressI } from '@/interfaces'
import React, { useEffect, useRef, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddressProcess({ token }: { token: string | undefined }) {

    //store user's addresses
    const [userAddresses, setuserAddresses] = useState<AddressDetailsI[] | null>(null)

    //controlled component by useRef instead useState to avoid Renders 
    const addressInput = useRef<HTMLInputElement | null>(null)
    const addressDetailsInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)
    const cityInput = useRef<HTMLInputElement | null>(null)

    //handling loading
    const [isLoading, setIsLoading] = useState(false)
    //handling cloasing dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    //handling removing loading
    const [removingId, setRemovingId] = useState<null | string>(null)
    

    //add an address function
    async function addAddress() {
        if (!addressInput.current?.value || !addressDetailsInput.current?.value || !phoneInput.current?.value || !cityInput.current?.value || !token) return;
        setIsLoading(true)
        const userAddress = {
            name: addressInput.current?.value,
            details: addressDetailsInput.current?.value,
            phone: phoneInput.current?.value,
            city: cityInput.current?.value,
        }
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            method: "POST",
            body: JSON.stringify(userAddress),
            headers: {
                token: token,
                'content-type': 'application/json'
            }
        })
        const data = await response.json()
        if (data.status === 'success') {
            await getUserAddresses()
            toast.success('Address added successfully')
            setIsDialogOpen(false)
        }
        setIsLoading(false)
    }

    // remove an address function
    async function removeAddress(addressId: string) {
        setRemovingId(addressId)
        if (!token) return;
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
            method: "DELETE",
            headers: {
                token: token,
            }
        })
        const data = await response.json()
        if (data.status === 'success') {
            await getUserAddresses()
            toast.success('Address removed successfully')
        }
        setRemovingId(null)
    }

    //get user's address function
    async function getUserAddresses() {
        if (!token) return;
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            method: "GET",
            headers: {
                token: token
            }
        })
        const res: AddressI = await response.json()
        setuserAddresses(res.data)
    }

    //calling api in component did mount
    useEffect(() => {
        if (token) {
            getUserAddresses()
        }
    }, [token])

    return (
        <section className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-6 text-main'>Your Addresses</h1>
            <div className='min-h-[75vh]'>
                {userAddresses && userAddresses.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {userAddresses.map((addr,index) => (
                            <Card key={addr._id} className="relative shadow-2xl">
                                <CardHeader>
                                    <CardTitle>Address {index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-bold text-sm">City:</p>
                                    <p className="text-sm text-gray-600 mb-2">{addr.name}</p>
                                    <p className="font-bold text-sm">Address's Details:</p>
                                    <p className="text-sm text-gray-600 mb-2">{addr.details}</p>
                                    <p className="font-bold text-sm">Phone:</p>
                                    <p className="text-sm text-gray-600 mb-2">{addr.phone}</p>
                                    <p className="font-bold text-sm">Country:</p>
                                    <p className="text-sm text-gray-600 mb-2">{addr.city}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end pt-2">
                                    <Button
                                        className='cursor-pointer'
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => addr._id && removeAddress(addr._id)}
                                    >
                                        {
                                            removingId == addr._id
                                                    ?
                                            <Loader className='animate-spin'/>
                                                :
                                            'Delete'
                                        }
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-40 border rounded-lg bg-gray-50">
                        <p className="text-gray-500">No addresses found.</p>
                    </div>
                )}
                <div className='mt-8 flex justify-center'>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className='cursor-pointer bg-main'>Add a new Address</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Your Address</DialogTitle>
                                <DialogDescription>
                                    Make sure you enter the right details
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">City</Label>
                                    <Input id="name" name="name" ref={addressInput} placeholder="Cairo" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="details">Address's Details</Label>
                                    <Input id="details" name="details" ref={addressDetailsInput} placeholder="Street, Apartment..." />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" name="phone" ref={phoneInput} placeholder="01xxxxxxxxx" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="city">Country</Label>
                                    <Input id="city" name="city" ref={cityInput} placeholder="Egypt" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">Cancel</Button>
                                </DialogClose>
                                <Button onClick={addAddress} disabled={isLoading} className='cursor-pointer bg-main'>
                                    {isLoading ? <Loader className='animate-spin'/> : 'Save changes'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </section>
    )
}
