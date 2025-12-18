'use client'
import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CartContext } from '@/app/_Components/context/CartContext'
import { OrderResponse } from '@/interfaces/order'
import { Loader } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'

export default function OrderProcess({token}: {token: string|undefined}) {

    //use context to share cart's data
    const { cartOwner } = useContext(CartContext)
    //store orders
    const [orders, setOrders] = useState<OrderResponse[]>([])
    //handling loading
    const [isLoading, setIsLoading] = useState(false)
    //store user's Id to use it
    const [userId, setUserId] = useState<string | null>(null)

    // Extract user ID from JWT token
    useEffect(() => {
        const tokenn = token
        try {
            const payload = tokenn?.split('.')[1]
            const decoded = JSON.parse(atob(payload!))
            setUserId(decoded.id)
        } catch (error) {
            console.error('Error decoding token:', error)
            setUserId(cartOwner)
        }
    }, [cartOwner])

    useEffect(() => {
        const ownerId = userId || cartOwner
        if (ownerId) {
            fetchOrders(ownerId)
        }
    }, [userId, cartOwner])

    //get user's orders function
    async function fetchOrders(ownerId: string) {
        setIsLoading(true)
        try {
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}`)
            const data: OrderResponse[] = await response.json()
            if (Array.isArray(data)) {
                setOrders(data)
            } else {
                console.error('Unexpected response format:', data)
                setOrders([])
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
            setOrders([])
        } finally {
            setIsLoading(false)
        }
    }

    const ownerId = userId || cartOwner

    return (
        <>
            <div className='min-h-[75vh]'>
                <h1 className='text-2xl font-bold mb-4 text-main'>All Orders</h1>
                {!ownerId && (
                    <p className='text-muted-foreground'>Loading user information...</p>
                )}
                {isLoading ? (
                    <div className='min-h-[90vh] flex justify-center items-center'>
                        <Loader size={50} className='animate-spin text-main' />
                    </div>
                ) : orders.length === 0 && ownerId ? (
                    <p>No orders found</p>
                ) : (
                    orders.map((order) => (
                        <Card key={order._id} className='mb-4 shadow-2xl'>
                            <CardHeader>
                                <CardTitle className='text-2xl font-bold'>Order # {order.id || order._id}</CardTitle>
                                <CardDescription>
                                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                                </CardDescription>
                                <CardAction className='text-muted-foreground'>Last Updated : {new Date(order.updatedAt).toLocaleDateString()}</CardAction>
                            </CardHeader>
                            <CardContent>
                                <p><span className='text-muted-foreground'>Total Price:</span> {order.totalOrderPrice} EGP</p>
                                <p><span className='text-muted-foreground'>Payment Method:</span> {order.paymentMethodType}</p>
                                <p><span className='text-muted-foreground'>Total Price:</span> {order.isPaid ? <span className='text-green-600'>Paid</span> : <span className='text-red-600'>Pending</span>}</p>
                                {order.shippingAddress && (
                                    <div className='mt-2'>
                                        <p className='text-sm text-muted-foreground'>
                                            Shipping Address : {order.shippingAddress.city}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='p-1 cursor-pointer rounded-2xl border text-white bg-main hover:bg-accent-foreground'>View Order Items</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className='text-center'>Order Items</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {order.cartItems.map((product) =>
                                            <DropdownMenuItem key={product._id} className='flex flex-col text-center'>
                                                <div>
                                                    <p>{product.product.title.split(' ', 3).join()}</p>
                                                    <span className='text-muted-foreground'>Qty: {product.count} | price: {product.price}</span>
                                                </div>
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </>
    )
}