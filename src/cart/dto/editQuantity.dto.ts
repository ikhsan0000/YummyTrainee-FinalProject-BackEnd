import { IsEmail, IsNotEmpty } from "class-validator";

export class EditQuantityDto
{
    @IsNotEmpty()
    cartToProductId: number

    quantity: number
}