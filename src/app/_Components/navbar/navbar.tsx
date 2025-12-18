'use client'
import React, { useContext, useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Loader, ShoppingCartIcon, UserIcon, Menu, X } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { signOut, useSession } from 'next-auth/react'
import { IoMdHeart } from "react-icons/io";
import { WishListContext } from '../context/WishListContext'


export default function Navbar() {

    //use cart context to share data
    const { cartData, isLoading } = useContext(CartContext)

    //use context to share wishlist's data
    const { wishListData, isWishListLoading } = useContext(WishListContext)

    //if user loged in then allow to add Product, if n't then prevent him
    const session = useSession()

    // State for mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <nav className='bg-main/90 py-3 sticky top-0 z-50 px-2'>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <h1 className='text-white'><Link href={'/'}>amazone<span className='text-sm'>.eg</span></Link></h1>

                        {/* Desktop Navigation - Hidden on mobile */}
                        <div className="hidden md:block">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link href="/products">Products</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link href="/categories">Categories</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link href="/brands">Brands</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        <div className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger className='cursor-pointer'><UserIcon className='text-white' /></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {
                                        session.status == 'authenticated'
                                            ?
                                            <>
                                                <Link href={'/updatepassword'}>
                                                    <DropdownMenuItem>
                                                        Change Password
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={'/allorders'}>
                                                    <DropdownMenuItem>
                                                        Your Orders
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={'/addresses'}>
                                                    <DropdownMenuItem>
                                                        Your Addresses
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem onClick={() => signOut({
                                                    callbackUrl: '/'
                                                })}>
                                                    Logout
                                                </DropdownMenuItem>
                                            </>
                                            :
                                            <>
                                                <Link href={'/login'}>
                                                    <DropdownMenuItem>
                                                        Login
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={'/register'}>
                                                    <DropdownMenuItem>
                                                        Register
                                                    </DropdownMenuItem>
                                                </Link>
                                            </>
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {
                                session.status == 'authenticated'
                                &&
                                <div className='relative'>
                                    <Link href={'/cart'}>
                                        <ShoppingCartIcon className='text-white' />
                                        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-3 -end-3">
                                            {isLoading ? <Loader className='animate-spin' /> : cartData?.numOfCartItems}
                                        </Badge>
                                    </Link>
                                </div>
                            }
                            {
                                session.status == 'authenticated'
                                &&
                                <div className='relative'>
                                    <Link href={'/wishlist'}>
                                        <IoMdHeart className='text-white' size={25} />
                                        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-3 -end-3">
                                            {isWishListLoading ? <Loader className='animate-spin' /> : wishListData?.count}
                                        </Badge>
                                    </Link>
                                </div>
                            }

                            {/* Mobile Menu Toggle Button */}
                            <button
                                className="md:hidden text-white ml-2 z-50 focus:outline-none"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pt-4 pb-4 border-t border-white/20 mt-2">
                            <ul className="flex flex-col gap-4 text-white font-medium">
                                <li>
                                    <Link href="/products" className="block w-full hover:text-gray-200" onClick={() => setIsMenuOpen(false)}>
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/categories" className="block w-full hover:text-gray-200" onClick={() => setIsMenuOpen(false)}>
                                        Categories
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/brands" className="block w-full hover:text-gray-200" onClick={() => setIsMenuOpen(false)}>
                                        Brands
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

