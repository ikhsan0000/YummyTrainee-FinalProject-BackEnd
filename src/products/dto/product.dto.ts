import { IsEnum, IsNotEmpty } from "class-validator";
import { SizesEnum } from "../entities/product.entitiy";

export class ProductDto
{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    price:number;

    imageUrl:string;

    brand: string;

    @IsEnum(SizesEnum)
    sizes: SizesEnum[]


}