'use server'

import { getUserToken } from "@/app/Helpers/getUserToken";

export async function AddToCartAction(productId:string) {

    //get user's token
    const token = await getUserToken()

    const response = await fetch(`${process.env.API_URL}/cart`, {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
            token: token!,
            "content-type": "application/json",
        },
    });
    const data = await response.json();
    return data
}
