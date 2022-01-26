import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { ProductImage } from './entities/product-image';
import { Product } from './entities/product.entitiy';
import { Size } from './entities/prouct-size';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Brand, Size, ProductImage])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
