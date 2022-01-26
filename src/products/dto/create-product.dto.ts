import { IsNotEmpty } from "class-validator";
import { Brand } from "../entities/brand.entity";
import { ProductImage } from "../entities/product-image";
import { Size } from "../entities/prouct-size.entity";

export class CreateProductDto
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