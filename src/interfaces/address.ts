export interface AddressI {
    results: number;
    status: string;
    data: AddressDetailsI[];
}

export interface AddressDetailsI {
    _id?: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}
