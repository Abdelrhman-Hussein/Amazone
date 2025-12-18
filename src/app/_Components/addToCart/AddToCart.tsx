'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { HeartIcon, Loader, ShoppingCartIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/CartContext'
import { AddToCartAction } from '@/app/(Pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AddToWishList from '../addToWishList/AddToWishList'

export default function AddToCart({ productId }: { productId: string }) {

    //use cart context to share cart's data
    const {setCartData} = useContext(CartContext)

    //handling loading
    const [isLoading, setIsLoading] = useState(false)

    //if user loged in then allow to add Product, if n't then prevent him
    const session = useSession()

    //if user add a Product and he is not loged in so navigate him to login's Page
    const router = useRouter()

    //add product to the cart function
    async function addProductToCart(){
        if(session.status == 'authenticated'){
            setIsLoading(true)
            //api call (server action)
            const data = await AddToCartAction(productId)
            data.status == 'success' && toast.success('Product added to successfully')
            setCartData(data)
            setIsLoading(false)
        }else{
            router.push('/login')
        }
    }

    return (
        <>
            <CardFooter className='gap-2 mt-3'>
                <Button onClick={addProductToCart} className='grow cursor-pointer bg-main'>
                    {isLoading ? <Loader className='animate-spin'/> : <ShoppingCartIcon />}Add To Cart
                </Button>
                <AddToWishList productId={productId}/>
            </CardFooter>
        </>
    )
}
