import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entitiy';
import { Size } from './entities/prouct-size.entity';
import { ProductSizeService } from './product-size.service';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Size) private readonly productSizeRepository: Repository<Size>,
        private readonly productSizeService: ProductSizeService
    ) { }


    async getAll() {
        return this.productRepository.find();
    }

    async create(data: CreateProductDto, images: any) {

        let product = new Product()
        product.name = data.name
        product.description = data.description
        product.price = data.price

        product.sizes = await Promise.all(data.sizes.map(size => {
            console.log(size)
            return this.productSizeRepository.findOne({ where: { name: size } })
        }))

        product.productImage = images
        console.log(product)

        return this.productRepository.save(product)

    }


}
