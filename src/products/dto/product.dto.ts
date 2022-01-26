import { IsNotEmpty } from "class-validator";
import { Brand } from "../entities/brand.entity";
import { ProductImage } from "../entities/product-image";
import { Size } from "../entities/prouct-size";

export class ProductDto
{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    price:number;

    images:ProductImage[];

    brand: Brand;

    sizes: Size[]


}