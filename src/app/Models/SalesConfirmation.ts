import { Product } from "./Product";

export interface SalesConfirmation{
    UserId: string,
    ClientId: string,
    Product: Product[]
    QuantityParcel?: number,
    Payment: string
}