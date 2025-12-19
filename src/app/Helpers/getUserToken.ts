import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    //get the token that we encrypted to it's real form
    const token = (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("__Secure-next-auth.session-token")?.value;
    const accessToken = await decode({token: token , secret: process.env.AUTH_SECRET!,});
    return accessToken?.token
}
