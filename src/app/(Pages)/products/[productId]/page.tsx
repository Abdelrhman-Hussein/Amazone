import { ProductI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MyStarIcon from '@/app/_Components/myStarIcon/myStarIcon'
import ProductSlider from '@/app/_Components/productSlider/ProductSlider'
import AddToCart from '@/app/_Components/addToCart/AddToCart'


export default async function ProductDetails({params}:{params:Params}) {

    //get the Product's Id from params
    const {productId} = await params

    //get specific product from Backend
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId)
    const {data:product}:{data:ProductI} = await response.json()

    return (
        <>
            <div className='h-[90vh] flex justify-center items-center'>
                <Card className='grid md:grid-cols-2 items-center md:w-3/4 lg:w-2/4 mx-auto shadow-2xl'>
                    <div>
                        <ProductSlider images={product.images} altContent={product.title} />
                    </div>
                    <div>
                        <CardHeader>
                            <CardDescription>{product.brand.name}</CardDescription>
                            <CardTitle>{product.title}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent className='mt-3'>
                            <CardDescription>{product.category.name}</CardDescription>
                            <div className='flex items-center gap-1'>
                                <MyStarIcon />
                                <MyStarIcon />
                                <MyStarIcon />
                                <MyStarIcon />
                                <MyStarIcon />
                                <p>({product.ratingsQuantity})</p>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <p className='font-bold'>Price : {product.price} EGP</p>
                                <p className='font-bold'>Quantity : {product.quantity} </p>
                            </div>
                        </CardContent>
                        <AddToCart productId={product._id} />
                    </div>
                </Card>
            </div>
        </>
    )
}
