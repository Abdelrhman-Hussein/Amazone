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
import { BrandI } from '@/interfaces'
import Link from 'next/link'
import Image from 'next/image'

export default async function Brands() {

    // const response = await fetch(`${process.env.API_URL}/brands`)
    // const {data:brands}:{data:BrandI[]} = await response.json()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
    const {data:brands}:{data:BrandI[]} = await response.json()

    return (
        <>
            <div className="py-2">
                <h1 className='text-3xl font-bold tracking-tight text-main'>Brands</h1>
                <p className='text-muted-foreground'>There is 40 Brands</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 py-3'>
                {brands.map((brand) =>
                    <div key={brand._id}>
                        <Link href={'/brands/' + brand._id}>
                            <Card className='shadow-2xl text-center'>
                                <CardHeader>
                                    <Image src={brand.image} className='w-full h-75 object-cover' alt='' width={300} height={300} />
                                </CardHeader>
                                <CardContent>
                                    <p className="font-bold text-main">{brand.name}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
