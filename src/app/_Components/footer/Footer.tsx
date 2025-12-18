import React from 'react'

export default function Footer() {
    return (
        <>
            <div className='py-3 px-3'>
                <div className="container mx-auto">
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 gap-y-8'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold text-main'>Amazone</h2>
                            <p className='text-muted-foreground'>
                                Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
                            </p>
                            <div className='flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <p className='text-muted-foreground'>123 Shop Street, Octoper City, DC 12345</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <p className='text-muted-foreground'>(+20) 01093333333</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <p className='text-muted-foreground'>support@shopmart.com</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h3 className='font-bold text-main'>Shop</h3>
                            <p className='text-muted-foreground'>Electronics</p>
                            <p className='text-muted-foreground'>Fashion</p>
                            <p className='text-muted-foreground'>Home & Garden</p>
                            <p className='text-muted-foreground'>Sports</p>
                            <p className='text-muted-foreground'>Deals</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h3 className='font-bold text-main'>CUSTOMER SERVICE</h3>
                            <p className='text-muted-foreground'>Contact Us</p>
                            <p className='text-muted-foreground'>Help Center</p>
                            <p className='text-muted-foreground'>Track Your Order</p>
                            <p className='text-muted-foreground'>Returns & Exchanges</p>
                            <p className='text-muted-foreground'>Size Guide</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h3 className='font-bold text-main'>ABOUT</h3>
                            <p className='text-muted-foreground'>About shopmart</p>
                            <p className='text-muted-foreground'>Careers</p>
                            <p className='text-muted-foreground'>Press</p>
                            <p className='text-muted-foreground'>Investor Relations</p>
                            <p className='text-muted-foreground'>Sustainability</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h3 className='font-bold text-main'>POLICIES</h3>
                            <p className='text-muted-foreground'>Privacy Policy</p>
                            <p className='text-muted-foreground'>Terms of Service</p>
                            <p className='text-muted-foreground'>Cookie Policy</p>
                            <p className='text-muted-foreground'>Shipping Policy</p>
                            <p className='text-muted-foreground'>Refund Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
