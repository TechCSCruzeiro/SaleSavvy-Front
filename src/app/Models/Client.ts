import { Address } from "./Address";

export interface Client{
    Id?: string,
    Name: string,
    Email: string,
    Phone: string,
    UserID: string,
    Address: Address;
}