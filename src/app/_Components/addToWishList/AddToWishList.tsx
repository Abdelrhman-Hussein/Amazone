'use client'
import { AddToWishListAction } from '@/app/(Pages)/wishlist/_action/addToWishList.action'
import { Button } from '@/components/ui/button'
import { HeartIcon, Loader } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { WishListContext } from '../context/WishListContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AddToWishList({productId}:{productId:string}) {

    //use context to share wishlist's data
    const {getWishList} = useContext(WishListContext)

    //handling loading
    const [isLoading, setIsLoading] = useState(false)

    //if user loged in then allow to add Product, if n't then prevent him
    const session = useSession()

    //if user add a Product and he is not loged in so navigate him to login's Page
    const router = useRouter()

    //add product to wishlist function
    async function addProductToWishList(){
        if(session.status == 'authenticated'){
            setIsLoading(true)
            //api call (server action)
            const data = await AddToWishListAction(productId)
            await getWishList()
            toast.success('Product added to WishList successfully')
            setIsLoading(false)
        }else{
            router.push('/login')
        }
    }

    return (
        <>
            <Button onClick={addProductToWishList} className='cursor-pointer bg-main'>
                {
                    isLoading
                        ?
                    <Loader className='animate-spin'/>
                        :
                    <HeartIcon />
                }
            </Button>
        </>
    )
}
