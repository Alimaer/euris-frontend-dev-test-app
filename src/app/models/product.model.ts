import { IProductData } from "./product-data.model";

export interface IProduct {
    id: string | null,
    data: IProductData
}