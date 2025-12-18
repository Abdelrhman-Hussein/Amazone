import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {

    return (
        <>
            <div className='h-[90vh] flex justify-center items-center'>
                <h1><Loader className='animate-spin text-main' size={70}/></h1>
            </div>
        </>
    )
}
