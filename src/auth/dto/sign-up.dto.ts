import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto
{
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