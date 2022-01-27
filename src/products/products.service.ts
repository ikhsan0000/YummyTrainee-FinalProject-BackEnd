import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { ProductImage } from './entities/product-image';
import { Product } from './entities/product.entitiy';
import { Size } from './entities/prouct-size.entity';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Size) private readonly productSizeRepository: Repository<Size>,
        @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) { }


    async getAll() {
        return this.productRepository.find({
            relations: ['sizes', 'brand', 'productImage', 'category']
        });
    }

    async getById(id: number): Promise<Product> {
        return this.productRepository.findOne(id, {
            relations: ['sizes', 'brand', 'productImage', 'category']
        })
    }

    async getByCategory(filter: string): Promise<Product[]> {
        const filterFormatted = filter.replace('-', ' ')
        return this.productRepository.find({
            relations: ['sizes', 'brand', 'productImage', 'category'],
            where: {
                'category': { name: [filterFormatted] }
            }
        });
    }

    async getByKeyword(keyword: string) {
        return this.productRepository.find({
            relations: ['sizes', 'brand', 'productImage', 'category'],
            where: [
                { name: Like(`%${keyword}%`) },
                { description: Like(`%${keyword}%`) },
                { brand: {name: Like(`%${keyword}%`)}}
            ]
        })
    }

    async create(data: CreateProductDto, images: any): Promise<Product> {

        let product = new Product()
        product.name = data.name
        product.description = data.description
        product.price = data.price

        const productImages = images.map((image: any) => {
            return {
                fileName: image.filename,
            };
        });
        product.productImage = productImages

        product.sizes = await Promise.all(data.sizes.map(size => {
            return this.productSizeRepository.findOne({ where: { name: size } })
        }))

        product.brand = await this.brandRepository.findOne({ where: { name: data.brand } })
        product.category = await this.categoryRepository.findOne({ where: { name: data.category } })

        await this.productRepository.save(product)


        return product


    }


}
