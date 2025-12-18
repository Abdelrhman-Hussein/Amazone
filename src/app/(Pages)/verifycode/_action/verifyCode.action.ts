"use server";

import { ResetCodeI } from "@/interfaces";

export async function VerifyResetCode(values:ResetCodeI) {
    const response = await fetch(`${process.env.API_URL}/auth/verifyResetCode`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
}
