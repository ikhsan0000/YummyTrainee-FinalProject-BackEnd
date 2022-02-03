import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartToProduct } from 'src/cart/entities/cartToProduct.entity';
import { Product } from 'src/products/entities/product.entitiy';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TransactionItem } from './entity/transaction-item.entity';
import { Transaction } from './entity/transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction, TransactionItem, User, Cart, Product, CartToProduct])],
  controllers: [TransactionsController],
  providers: [TransactionsService, UserService, CartService]
})
export class TransactionsModule {}
