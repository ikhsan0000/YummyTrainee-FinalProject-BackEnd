import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto
{
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    fullName:string;

    @IsEmail()
    @IsNotEmpty()
    email:string
}