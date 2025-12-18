'use server'

import { getUserToken } from "@/app/Helpers/getUserToken";
import { UpdatePasswordI } from "@/interfaces";

export async function UpdateUserPassword(values:UpdatePasswordI){

    //get user's token
    const token = await getUserToken()

    const response = await fetch(
        `${process.env.API_URL}/users/changeMyPassword`,
        {
            method: "PUT",
            body: JSON.stringify(values),
            headers: { 
                token : token!,
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    return data;
}