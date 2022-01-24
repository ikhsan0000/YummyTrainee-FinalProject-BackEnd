import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Tokens } from './types';
import { Request } from "express";


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() signUpDto: SignUpDto): Promise<Tokens>{
        return this.authService.signupLocal(signUpDto)
    }

    @Post('/local/login')
    @HttpCode(HttpStatus.OK)
    loginLocal(@Body() loginDto: LoginDto): Promise<Tokens>{
        return this.authService.loginLocal(loginDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request){
        return this.authService.logout(req.user['sub'])
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request){
        const user = req.user
        this.authService.refreshToken(user['sub'], user['refreshToken'])
    }
}
