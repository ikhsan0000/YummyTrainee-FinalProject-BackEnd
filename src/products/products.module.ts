import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { ProductImage } from './entities/product-image';
import { Product } from './entities/product.entitiy';
import { Size } from './entities/prouct-size.entity';
import { ProductSizeController } from './product-size.controller';
import { ProductSizeService } from './product-size.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Brand, Size, ProductImage, Category])],
  controllers: [ProductsController, ProductSizeController],
  providers: [ProductsService, ProductSizeService]
})
export class ProductsModule {}
