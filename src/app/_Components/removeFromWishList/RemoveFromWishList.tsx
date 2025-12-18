'use client'
import { WishListContext } from '@/app/_Components/context/WishListContext'
import Loading from '@/app/loading'
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card'
import { WishListResponse } from '@/interfaces/wishList'
import { Loader } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import AddToCart from '../addToCart/AddToCart'
import MyStarIcon from '../myStarIcon/myStarIcon'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function RemoveFromWishList({token}:{token:string|undefined}) {

    //use context to share wishlist's data
    const { getWishList, wishListData, isWishListLoading } = useContext(WishListContext)
    //handling loading
    const [removingId, setRemovingId] = useState<null | string>(null)

    //remove item from wishlist function
    async function removeWishListItem(productId: string) {
        setRemovingId(productId)
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/` + productId,
            {
                method: "DELETE",
                headers: {
                    token: token!
                }
            }
        )
        const data: WishListResponse = await response.json()
            toast.success('Product deleted successfully')
            getWishList()
            setRemovingId(null)
    }

    return (
        <>
            {
                isWishListLoading
                    ?
                <Loading />
                    :
                wishListData?.data.length! > 0
                    ?
                <>
                <div className="container mx-auto py-3 px-4">
                    <h1 className='text-3xl font-bold tracking-tight text-main'>Wish List</h1>
                    <p className='text-muted-foreground'>{wishListData?.data.length} items in your cart</p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12'>
                        {
                            wishListData?.data.map((data) =>
                                <Card className='shadow-2xl' key={data.id}>
                                    <Link href={'/products/' + data.id}>
                                        <CardHeader>
                                            <Image src={data.imageCover} className='w-full' alt='' width={300} height={300} />
                                            <CardDescription>{data.brand.name}</CardDescription>
                                            <CardTitle>{data.title.split(' ', 4).join()}</CardTitle>
                                            <CardDescription>{data.category.name}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='flex'>
                                                <MyStarIcon />
                                                <MyStarIcon />
                                                <MyStarIcon />
                                                <MyStarIcon />
                                                <p>{data.ratingsAverage}</p>
                                            </div>
                                            <p>Price: <span className='font-bold'>{data.price} EGP</span></p>
                                        </CardContent>
                                    </Link>
                                    <button onClick={() => removeWishListItem(data.id)} className='w-75 cursor-pointer mx-auto bg-red-500 text-white px-3 py-1 rounded'>{removingId === data.id ? <Loader className="animate-spin mx-auto" /> : 'Remove'}</button>
                                </Card>
                            )
                        }
                    </div>
                </div>
                </>
                :
                <div className='flex flex-col justify-center items-center h-[75vh]'>
                    <h1 className='text-2xl my-4 text-center'>Your Wish-list is Empty....😥</h1>
                    <Link href={'/products'}>
                        <Button className='cursor-pointer bg-main'>Add ones</Button>
                    </Link>
                </div>
            }
        </>
    )
}
