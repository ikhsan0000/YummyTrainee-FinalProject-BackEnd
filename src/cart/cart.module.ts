import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entitiy';
import { UserProfile } from 'src/user/entities/user-profile.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CartToProduct } from './entities/cartToProduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Cart, Product, CartToProduct])],
  controllers: [CartController],
  providers: [CartService, UserService]
})
export class CartModule {}
