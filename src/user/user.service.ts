import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cart } from 'src/cart/entities/cart.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserFavorites } from './entities/user-favorites.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

    async getById(userId: number){
        const user = await this.userRepository.findOne(userId)
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user
    }

    async getOnebyField(field: string, searchedValue:string){
        const user = await this.userRepository.findOne({
            where:[
                {[field]: searchedValue}
            ]
        })
      
        return user
    }

    async create(createUserDto: CreateUserDto){
        
        let user = new User();
        const {password} = createUserDto
        const passwordHashed = await bcrypt.hash(password, 10);
        
        const cart = new Cart();
        const profile = new UserProfile();
        const favorite = new UserFavorites()
        profile.userFavorites = favorite
        profile.fullName = createUserDto.fullName

        user.password = passwordHashed
        user.email = createUserDto.email
        user.cart = cart
        user.userProfile = profile

        await this.userRepository.save(user)

        return user;
    }
    
    async update(updateUserDto: UpdateUserDto) {
        console.log('im out here')
        if(updateUserDto.password){
            if(!updateUserDto.oldPassword)
            { 
                throw new BadRequestException('old passowrd must be provided')
            }
            const hashedOldPassword =  (await this.getById(updateUserDto.id)).password
            const isPasswordMatch = await bcrypt.compare(updateUserDto.oldPassword, hashedOldPassword)
            if(isPasswordMatch == false)
            { 
                throw new BadRequestException("old password is incorrect")
            }
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        return await this.userRepository.save({
            ...updateUserDto
        })
    }

    async delete(userId: number){
        return await this.userRepository.delete({id: userId})
    }


}
