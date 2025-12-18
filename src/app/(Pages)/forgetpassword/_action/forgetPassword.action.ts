'use server'

import { ForgetPasswordI } from "@/interfaces";

// send code function
export async function SendCode(values: ForgetPasswordI) {
    const response = await fetch(
        `${process.env.API_URL}/auth/forgotPasswords`,
        {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "content-type": "application/json" },
        }
    );
    const data = await response.json();
    return data;
}