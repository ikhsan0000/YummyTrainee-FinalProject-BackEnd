import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cart } from 'src/cart/entities/cart.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';


@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile) private readonly userProfileRepository: Repository<UserProfile>,
    ){}

    async getByUserId(userId: number){
        const userProfile = await this.userProfileRepository.findOne({
            relations:['user'],
            where: {user: { id: userId }}
        });
    
        return userProfile
    }

    async updateUserProfile(userId: number, updateProfileDto: UpdateProfileDto){
        const currentProfile = await this.getByUserId(userId)
        return await this.userProfileRepository.save({
            id: currentProfile.id,
            ...updateProfileDto
        })
    }

    async updateProfilePicture(userId: number, image: any){
        const currentProfile = await this.getByUserId(userId)
        return await this.userProfileRepository.save({
            id: currentProfile.id,
            profilePicture: image.filename
        })
    }


}
