import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Products } from './entities/product.entitiy';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports:[TypeOrmModule.forFeature([Products, Brand])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
