import { IsEmail, IsNotEmpty } from "class-validator";
import { Cart } from "src/cart/entities/cart.entity";

export class CreateUserDto {

    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string
 
    @IsNotEmpty()
    password: string;

    // cart: Cart;
}