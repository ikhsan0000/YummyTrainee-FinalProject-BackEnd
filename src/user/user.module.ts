import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entitiy';
import { ProductsService } from 'src/products/products.service';
import { UserFavorites } from './entities/user-favorites.entity';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, UserFavorites, Product])
  ],
  controllers: [UserController, UserProfileController],
  providers: [UserService, UserProfileService]
})
export class UserModule {}
