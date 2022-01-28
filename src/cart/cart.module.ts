import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entitiy';
import { User } from 'src/user/entities/user.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Cart, Product])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
