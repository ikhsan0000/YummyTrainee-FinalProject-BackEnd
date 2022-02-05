import { BadRequestException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async signupLocal(signUpDto: SignUpDto): Promise<Tokens> {

        if(signUpDto.password !== signUpDto.passwordConfirm)
        {
            throw new BadRequestException('Password does not match')
        }

        const isEmailExist = await this.userService.getOnebyField('email', signUpDto.email)

        if(isEmailExist) {
            throw new BadRequestException('email already used')
        }

        // if no error, handle register
        const {passwordConfirm, ...rest} = signUpDto 

        const newUser = await this.userService.create(rest)
        const tokens = await this.getTokens(newUser.id, newUser.email)
        await this.updateRtHash(newUser.id, tokens.refreshToken)

        return tokens;
    }

    async loginLocal(loginDto: LoginDto): Promise<Tokens> {
        const user = await this.userService.getOnebyField('email', loginDto.email)
        if(!user){
            throw new ForbiddenException('Wrong credentials')
        }

        const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password)
        if(!isPasswordMatch){
            throw new ForbiddenException('Wrong credentials')
        }

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refreshToken)

        return tokens;
    }

    async logout(userId: number) {
        await this.userService.update({id: userId, hashedRt: null})
    }

    async refreshToken(userId: number, rt: string) {
        const user = await this.userService.getById(userId)
        if(!user || !user.hashedRt){
            throw new ForbiddenException('Access denied')
        }

        const isRtMatch = bcrypt.compare(rt, user.hashedRt)
        if(!isRtMatch){
            throw new ForbiddenException('Access denied')
        }
        
        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refreshToken)

        return tokens;

    }

    async updateRtHash(userId: number, rt: string){
        const hash = await this.hashData(rt)
        await this.userService.update({id: userId, hashedRt: hash})
    } 


    // Helper function

    hashData(data: string) {
        return bcrypt.hash(data, 10);
      }


    async getTokens(userId: number, email: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: 'at-secret',
                    expiresIn: 60 * 60 * 12
                }
                ),
                this.jwtService.signAsync(
                    {
                        sub: userId,
                        email,
                    },
                    {
                        secret: 'rt-secret',
                        expiresIn: 3600 * 24 * 7
                }
            )

        ])
        
        return {
            accessToken: at,
            refreshToken: rt
        }
    }

   

}
