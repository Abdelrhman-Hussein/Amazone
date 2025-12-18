import React from 'react'
import { Params } from 'next/dist/server/request/params'
import { ProductI } from '@/interfaces'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AddToCart from '@/app/_Components/addToCart/AddToCart'
import MyStarIcon from '@/app/_Components/myStarIcon/myStarIcon'
import Image from 'next/image'
import Link from 'next/link'

export default async function BrandDetails({params}:{params:Params}) {

    //get the Brand's Id from params
    const { brandId } = await params

    // get all Products that from this Brand from Backend
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
    const {data:products}:{data:ProductI[]} = await response.json()
    console.log(products)

    return (
        <>
                {
                    products.length > 0 
                            ?
                    <>
                    <div className='my-3'>
                        <h1 className='text-3xl font-bold tracking-tight text-main'>{products[0].brand.name}</h1>
                        <p className='text-muted-foreground'>{products.length} items in this Brand</p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12'>
                            {products.map((product) =>
                                <div key={product.id}>
                                    <Card className='shadow-2xl'>
                                        <Link href={'/products/' + product.id}>
                                            <CardHeader>
                                                <Image src={product.imageCover} className='w-full' alt='' width={300} height={300} />
                                                <CardDescription>{product.brand.name}</CardDescription>
                                                <CardTitle>{product.title.split(' ', 4).join()}</CardTitle>
                                                <CardDescription>{product.category.name}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className='flex'>
                                                    <MyStarIcon />
                                                    <MyStarIcon />
                                                    <MyStarIcon />
                                                    <MyStarIcon />
                                                    <p>{product.ratingsAverage}</p>
                                                </div>
                                                <p>Price: <span className='font-bold'>{product.price} EGP</span></p>
                                            </CardContent>
                                        </Link>
                                        <AddToCart productId={product._id} />
                                    </Card>
                                </div>
                            )}
                    </div>
                    </>                :
                    <div className='flex justify-center items-center h-[75vh]'>
                        <h1>There is no Products from this Brand....😥</h1>
                    </div>
                }
        </>
    )
}
