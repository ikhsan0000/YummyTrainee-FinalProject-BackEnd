import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateProfileDto
{
    fullname?: string;
    address?: string;
    profilePicture?: string;
}