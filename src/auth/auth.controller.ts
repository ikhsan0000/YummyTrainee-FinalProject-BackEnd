import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Tokens } from './types';
import { Request } from "express";
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorator';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    
    @Public()
    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() signUpDto: SignUpDto): Promise<Tokens>{
        return this.authService.signupLocal(signUpDto)
    }

    @Public()
    @Post('/local/login')
    @HttpCode(HttpStatus.OK)
    async loginLocal(@Body() loginDto: LoginDto): Promise<Tokens>{
        return this.authService.loginLocal(loginDto)
    }
    
    @UseGuards(AtGuard)
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUser('sub') userId:number){
        return this.authService.logout(userId)
    }
    
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(
        @GetCurrentUser('refreshToken') refreshToken:string,
        @GetCurrentUser('sub') userId:number
    ){
        return this.authService.refreshToken(userId, refreshToken)
    }
}
