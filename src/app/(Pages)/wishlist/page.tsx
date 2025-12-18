import RemoveFromWishList from '@/app/_Components/removeFromWishList/RemoveFromWishList'
import { getUserToken } from '@/app/Helpers/getUserToken'


export default async function WishList() {

    const token = await getUserToken()
    return (
        <>
            <RemoveFromWishList token={token}/>
        </>
    )
}
