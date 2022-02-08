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
            relations:['user', 'userFavorites'],
            where: {user: { id: userId }}
        });

        if(!userProfile){
            throw new NotFoundException('User not found')
        }
    
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

    async addUserFavoriteProduct(userId: number, productId: number){
        const product = await this.productRepository.findOne(productId)
        if(!product){
            throw new NotFoundException('Product not found')
        }
        const currentProfile = await this.getByUserId(userId)
    
        currentProfile.userFavorites.product.push(product)

        return await this.userProfileRepository.save(currentProfile)
    }

    async removeUserFavoriteProduct(userId: number, productId: number){
        // const product = await this.productRepository.findOne(productId)
        const currentProfile = await this.getByUserId(userId)

        const favoriteProduct = currentProfile.userFavorites.product

        // remove product(productId) from the array
        const filteredFavoriteProduct = favoriteProduct.filter((product) => {
            return product.id !== productId
        })

        currentProfile.userFavorites.product = filteredFavoriteProduct

        return await this.userProfileRepository.save(currentProfile)
    }


}
