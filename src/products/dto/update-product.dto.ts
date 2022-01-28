import { IsNotEmpty } from "class-validator";
import { Brand } from "../entities/brand.entity";
import { Category } from "../entities/category.entity";
import { ProductImage } from "../entities/product-image";
import { Size } from "../entities/prouct-size.entity";

export class UpdateProductDto {
    
    name?: string;
    description?: string;
    price?: number;
    category?: Category;
    brand?: Brand;
    sizes?: Size[]

}