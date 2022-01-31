import { IsNotEmpty } from "class-validator";
import { Brand } from "../entities/brand.entity";
import { Category } from "../entities/category.entity";
import { ProductImage } from "../entities/product-image";
import { Size } from "../entities/prouct-size.entity";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    category: string;

    brand: string;

    sizes: string[]

    images: ProductImage[];

}