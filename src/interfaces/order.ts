import { CartItemI } from "./cartItem";
import { ShippingAddressI } from "./shippingAddress";
import { UserI } from "./user";

export interface OrderResponse {
    shippingAddress: ShippingAddressI;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: UserI;
    cartItems: CartItemI[];
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
}
