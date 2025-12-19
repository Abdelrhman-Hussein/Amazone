'use client'
import { CartResponse, ProductI } from "@/interfaces";
import { WishListResponse } from "@/interfaces/wishList";
import { createContext, ReactNode, useEffect, useState } from "react";

//creating context to share wishList's data overall the project to show wishList's data on Navbar & WishList Component
export const WishListContext = createContext<{
    wishListData: WishListResponse | null,
    setWishListData: (value: WishListResponse | null) => void,
    isWishListLoading: boolean,
    setIsWishListLoading: (value: boolean) => void,
    getWishList: () => void,
}>({
    wishListData: null,
    setWishListData: () => { },
    isWishListLoading: false,
    setIsWishListLoading: () => { },
    getWishList: () => { },
})
export default function WishListProvider({ children }: { children: ReactNode }) {

    //handling loading
    const [isWishListLoading, setIsWishListLoading] = useState(false)

    //store all wishList's data in a state
    const [wishListData, setWishListData] = useState<WishListResponse | null>(null)

    //get all cart's data from Backend
    async function getWishList() {
        setIsWishListLoading(true)
        //Route Handler
        const response = await fetch('/api/get-wishList')
        // const response = await fetch('http://localhost:3000/api/get-wishList')
        const data: WishListResponse = await response.json()
        setWishListData(data)
        setIsWishListLoading(false)
    }

    useEffect(() => {
        getWishList()
    }, [])


    return <WishListContext.Provider value={{ wishListData, setWishListData, isWishListLoading, setIsWishListLoading, getWishList }}>
        {children}
    </WishListContext.Provider>

}