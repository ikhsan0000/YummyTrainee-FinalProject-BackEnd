import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto
{
    @IsNotEmpty()
    id:number;

    password?:string;
    oldPassword?:string
    hashedRt?:string
}