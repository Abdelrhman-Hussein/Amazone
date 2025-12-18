import { Product } from "./orderProduct";

export interface CartItemI {
    count: number;
    product: Product;
    price: number;
    _id: string;
}