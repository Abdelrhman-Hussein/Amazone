import CartProcess from "@/app/_Components/cartProcess/CartProcess"
import { getUserToken } from "@/app/Helpers/getUserToken"


export default async function Cart() {

    //get user's token
    const token = await getUserToken()

    return (
        <>
            <CartProcess token={token}/>
        </>
    )
}
