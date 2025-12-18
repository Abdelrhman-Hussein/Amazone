'use client'
import { CartContext } from '@/app/_Components/context/CartContext'
import Loading from '@/app/loading'
import { Button } from '@/components/ui/button'
import { Banknote, Loader, ShoppingCart, Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { CartResponse } from '@/interfaces'
import toast from 'react-hot-toast'
import CheckOut from '@/app/_Components/checkOut/CheckOut'

export default function CartProcess({token}: {token: string|undefined}) {

    //use cart context to share data
    const { cartData, isLoading, getCart, setCartData } = useContext(CartContext)

    useEffect(() => {
        if (typeof cartData?.data.products[0]?.product == 'string' || cartData == null) {
            getCart()
        }
    }, [cartData])

    //handling all loading
    const [isShoppingLoading, setIsShoppingLoadingg] = useState(false)
    const [removingId, setRemovingId] = useState<null | string>(null)
    const [updatingId, setUpdatingId] = useState<null | string>(null)
    const [isCleared, setIsCleared] = useState<boolean>(false)

    //remove , update , clear cart's item functions
    async function removeCartItem(productId: string) {
        setRemovingId(productId)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId,
            {
                method: "DELETE",
                headers: {
                    token: token!
                }
            }
        )
        const data: CartResponse = await response.json()
        if (data.status = 'success') {
            toast.success('Product deleted successfully')
            setCartData(data)
        }
        setRemovingId(null)
    }
    async function updateCartItem(productId: string, count: number) {
        setUpdatingId(productId)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId,
            {
                method: "PUT",
                body: JSON.stringify({ count }),
                headers: {
                    token: token!,
                    'content-type': 'application/json'
                }
            }
        )
        const data: CartResponse = await response.json()
        if (data.status = 'success') {
            toast.success('Quantity updated successfully')
            setCartData(data)
        }
        setUpdatingId(null)
    }
    async function clearCart() {
        setIsCleared(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',
            {
                method: "DELETE",
                headers: {
                    token: token!
                }
            }
        )
        const data: CartResponse = await response.json()
        if (data.message == 'success') {
            toast.success('Cart cleared successfully')
            setCartData(null)
        }
        setIsCleared(false)
    }

    return (
        <>
            {
                isLoading || typeof cartData?.data.products[0]?.product == 'string'
                    ?
                    <Loading />
                    :
                    cartData?.numOfCartItems! > 0
                        ?
                        <div className="container mx-auto py-3 px-4">
                            <h1 className='text-3xl font-bold tracking-tight text-main'>Shopping Cart</h1>
                            <p className='text-muted-foreground'>{cartData?.numOfCartItems} items in your cart</p>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6'>
                                {/* items details */}
                                <div className='lg:col-span-2 space-y-4'>
                                    {/* making a loop based on products on cart */}
                                    {cartData?.data.products.map((item) =>
                                        <div key={item._id} className='flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>
                                            <img src={item.product.imageCover} alt={item.product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />
                                            <div className='flex-1'>
                                                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
                                                    <div className=''>
                                                        <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                                                            {item.product.title}
                                                        </h3>
                                                        <p className='text-sm text-muted-foreground mt-1'>
                                                            {item.product.brand.name}
                                                            {item.product.category.name}
                                                        </p>
                                                    </div>
                                                    <div className='text-right'>
                                                        <div className='font-semibold'>
                                                            {item.price} EGP
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-3 flex items-center justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                        <button disabled={item.count == 1} onClick={() => updateCartItem(item.product._id, item.count - 1)} aria-label='decrease' className='size-8 text-white rounded-lg border cursor-pointer bg-main hover:bg-accent-foreground'>
                                                            -
                                                        </button>
                                                        <span className='w-6 text-center font-medium'>
                                                            {
                                                                updatingId == item.product._id
                                                                    ?
                                                                    <Loader className='animate-spin' />
                                                                    :
                                                                    item.count
                                                            }
                                                        </span>
                                                        <button onClick={() => updateCartItem(item.product._id, item.count + 1)} aria-label='increase' className='size-8 text-white rounded-lg border cursor-pointer bg-main hover:bg-accent-foreground'>
                                                            +
                                                        </button>
                                                    </div>
                                                    <button onClick={() => removeCartItem(item.product._id)} aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline items-center'>
                                                        {
                                                            removingId == item.product._id
                                                                ?
                                                                <Loader className='animate-spin' />
                                                                :
                                                                "Remove"
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {/* order summary */}
                                    <div className='lg:col-span-1 sticky top-18'>
                                        <div className='rounded-xl border p-5 shadow-sm'>
                                            <h2 className='text-lg font-semibold'>Order Summary</h2>
                                            <div className='mt-4 space-y-2'>
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-sm text-muted-foreground'>
                                                        Subtotal : {cartData?.numOfCartItems} items
                                                    </span>
                                                    <span className='font-semibold'>{cartData?.data.totalCartPrice} EGP</span>
                                                </div>
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-sm text-muted-foreground'>Shipping</span>
                                                    <span className='text-emerald-600 font-medium'>Free</span>
                                                </div>
                                            </div>
                                            <div className='my-4 border-t' />
                                            <div className='flex items-center justify-between'>
                                                <span className='text-base font-semibold'>Total</span>
                                                <span className='text-base font-bold'>{cartData?.data.totalCartPrice} EGP</span>
                                            </div>
                                            <CheckOut token={token} cartId={cartData?.cartId!} />
                                            <Link href={'/products'} onClick={() => setIsShoppingLoadingg(true)}>
                                                <Button className='w-full text-lg mt-2 cursor-pointer bg-main'>
                                                    {isShoppingLoading ? <Loader className='animate-spin' /> : <ShoppingCart />} Continue Shopping
                                                </Button>
                                            </Link>
                                        </div>
                                        <Button onClick={clearCart} variant={'outline'} className='mt-2 ms-auto text-destructive hover:text-destructive flex cursor-pointer'>{isCleared ? <Loader className='animate-spin' /> : <Trash2 />} Clear Cart</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex min-h-[75vh] justify-center items-center flex-col'>
                            <h2 className='text-2xl my-4'>Your Cart is Empty....😥</h2>
                            <Link href={'/products'}>
                                <Button className='cursor-pointer bg-main'>Add ones</Button>
                            </Link>
                        </div>
            }
        </>
    )
}
