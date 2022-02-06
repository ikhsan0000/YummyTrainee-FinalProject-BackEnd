import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Product } from 'src/products/entities/product.entitiy';


@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile) private readonly userProfileRepository: Repository<UserProfile>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ){}

    async getByUserId(userId: number){
        const userProfile = await this.userProfileRepository.findOne({
            relations:['user', 'favorites'],
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

    async updateUserFavorite(userId: number, productId: number){
        const product = await this.productRepository.findOne(productId)
        const currentProfile = await this.getByUserId(userId)

        return true
    }


}
