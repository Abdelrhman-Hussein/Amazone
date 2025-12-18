'use client'
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

//creating context to share cart's data overall the project to show cart's data on Navbar & Cart Component
export const CartContext = createContext<{
    cartData:CartResponse | null,
    setCartData: (value: CartResponse | null)=>void,
    isLoading:boolean,
    setIsLoading:(value:boolean)=>void,
    getCart:()=>void,
    cartOwner:string|null
}>({
    cartData:null,
    setCartData:()=>{},
    isLoading:false,
    setIsLoading:()=>{},
    getCart:()=>{},
    cartOwner:null,
})
export default function CartContextProvider({children}:{children:ReactNode}){

    //handling loading
    const [isLoading, setIsLoading] = useState(false)

    //store all cart's data in a state
    const [cartData, setCartData] = useState<CartResponse|null>(null)

    //store cart's owner id to use it in allorders page
    const [cartOwner, setCartOwner] = useState<string|null>(null)

    //get all cart's data from Backend
    async function getCart(){
        setIsLoading(true)
        //Route Handler
        const response = await fetch('http://localhost:3000/api/get-cart')
        const data:CartResponse = await response.json()
        setCartData(data)
        setCartOwner(data.data?.cartOwner)
        setIsLoading(false)
    }

    useEffect(() => {
        getCart()
    }, [])
    

    return <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart, cartOwner }}>
        {children}
    </CartContext.Provider>

}