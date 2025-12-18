import { getUserToken } from '@/app/Helpers/getUserToken';
import AddressProcess from '@/app/_Components/addressProcess/AddressProcess';

export default async function Addresses() {

    //get user's Token
    const token = await getUserToken();

    return (
        <>
            <AddressProcess token={token}/>
        </>
    )
}
