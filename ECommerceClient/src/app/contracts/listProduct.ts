import { ListProductImage } from "./listProductImage";

export class ListProduct {
    id:string;
    name:string;
    stock:number;
    price:number;
    createdDate:Date;
    updatedDate:Date;
    productImageFiles?: ListProductImage[];
    imagePath: string;
}