'use server'

import { ResetPasswordI } from "@/interfaces";

export async function ResetUserPassword(values:ResetPasswordI){
    const response = await fetch(`${process.env.API_URL}/auth/resetPassword`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
}