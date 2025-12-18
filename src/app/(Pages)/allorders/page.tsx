import OrderProcess from "@/app/_Components/orderProcess/OrderProcess"
import { getUserToken } from "@/app/Helpers/getUserToken"


export default async function AllOrders() {

    //get user's Token
    const token = await getUserToken()
    
    return (
        <>
            <OrderProcess token={token}/>
        </>
    )
}