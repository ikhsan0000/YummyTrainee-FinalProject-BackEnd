import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto
{
    id?:number;

    password?:string;
    oldPassword?:string
    hashedRt?:string
}