import { ProductI } from "./product";

export interface WishListResponse {
    status: string;
    count: number;
    data: ProductI[];
}