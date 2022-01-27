import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async getById(userId: number){
        return await this.userRepository.findOne(userId)
    }

    async getOnebyField(field: string, searchedValue:string){
        return await this.userRepository.findOne({
            where:[
                {[field]: searchedValue}
            ]
        })
    }

    async create(createUserDto: CreateUserDto){
        
        let user = new User();
        const {password} = createUserDto
        const passwordHashed = await bcrypt.hash(password, 10);
        
        // user.username = createUserDto.username
        user.fullName = createUserDto.fullName
        user.password = passwordHashed
        user.email = createUserDto.email

        this.userRepository.create(user)
        await this.userRepository.save(user)

        return user;
    }
    
    async update(updateUserDto: UpdateUserDto) {
        await this.userRepository.save({
            ...updateUserDto
        })
    }



}
