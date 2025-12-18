import { getUserToken } from "@/app/Helpers/getUserToken"
import { BrandI, CategoryI, ProductI } from "@/interfaces"
import { WishListResponse } from "@/interfaces/wishList"
import { NextResponse } from "next/server"


export async function GET(){

    const token = await getUserToken()

    const response = await fetch(`${process.env.API_URL}/wishlist`,
        {
            headers:{
                token:token!
            }
        }
    )
    const data:WishListResponse = await response.json()
    return NextResponse.json(data)
}