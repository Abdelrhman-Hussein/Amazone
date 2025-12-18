'use server'

import { RegisterI } from "@/interfaces";

export async function RegisterUser(values:RegisterI){
    const response = await fetch(`${process.env.API_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
}