import React from 'react'
import error from '../../public/error.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <div className='min-h-[75vh] flex flex-col gap-4 justify-center items-center'>
                <Image src={error} width={600} height={600} alt=''/>
                <Link href={'/'}>
                    <Button className='cursor-pointer bg-main'>Go to Home</Button>
                </Link>
            </div>
        </>
    )
}
