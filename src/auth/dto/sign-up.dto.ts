import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto
{
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    passwordConfirm:string;

    @IsNotEmpty()
    fullName:string;
    
    @IsEmail()
    @IsNotEmpty()
    email:string
}