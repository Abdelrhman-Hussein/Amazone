import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CategoryI } from '@/interfaces'
import Image from "next/image"
import Link from 'next/link'
import React from 'react'

export default async function Categories() {

    // const response = await fetch(`${process.env.API_URL}/categories`)
    // const {data:categories}:{data:CategoryI[]} = await response.json()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
    const {data:categories}:{data:CategoryI[]} = await response.json()

    return (
        <>
            <div className="py-2">
                <h1 className='text-3xl font-bold tracking-tight text-main'>Categories</h1>
                <p className='text-muted-foreground'>There is 10 Categories</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 py-3'>
                {categories.map((category)=>
                    <div key={category._id}>
                        <Link href={'/categories/'+category._id}>
                            <Card className='shadow-2xl text-center'>
                                    <CardHeader>
                                        <Image src={category.image} className='w-full h-75 object-cover' alt='' width={300} height={300} />
                                    </CardHeader>
                                    <CardContent>
                                    <p className="font-bold text-main">{category.name}</p>
                                    </CardContent>
                            </Card>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
