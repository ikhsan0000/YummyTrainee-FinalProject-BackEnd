import { IsEmail } from "class-validator";

export class UpdateUserDto
{
    id?:number;
    username?:string;
    password?:string;
    passwordConfirm?:string;
    fullName?:string;
    @IsEmail()
    email?:string
    hashedRt?:string
}