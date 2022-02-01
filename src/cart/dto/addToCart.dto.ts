import { IsEmail, IsNotEmpty } from "class-validator";

export class AddToCartDto
{
    @IsNotEmpty()
    productId:number

    @IsNotEmpty()
    quantity: number

    size: string

    image: string
    
}