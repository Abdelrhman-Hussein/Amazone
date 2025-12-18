import { ProductI } from '@/interfaces';
import React, { useContext } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import MyStarIcon from '@/app/_Components/myStarIcon/myStarIcon';
import Link from 'next/link';
import AddToCart from '@/app/_Components/addToCart/AddToCart';

export default async  function Products() {
    
    // const response = await fetch(`${process.env.API_URL}/products`)
    // const {data:products}:{data:ProductI[]} = await response.json()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
    const {data:products}:{data:ProductI[]} = await response.json()

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
                {products.map((product) =>
                    <div key={product.id}>
                        <Card className='shadow-2xl'>
                            <Link href={'/products/'+product.id}>
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
                            <AddToCart productId={product._id}/>
                        </Card>
                    </div>
                )}
            </div>
        </>
    )
}
