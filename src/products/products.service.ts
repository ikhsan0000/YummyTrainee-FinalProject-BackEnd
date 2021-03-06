import * as fs from 'fs';
import { promisify } from 'util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { ProductImage } from './entities/product-image';
import { Product } from './entities/product.entitiy';
import { Size } from './entities/prouct-size.entity';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Size) private readonly productSizeRepository: Repository<Size>,
        @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(ProductImage) private readonly imageRepository: Repository<ProductImage>
    ) { }


    async getAll() {
        return this.productRepository.find({
            relations: ['sizes', 'brand', 'productImage', 'category']
        });
    }

    async getById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id, {
            relations: ['sizes', 'brand', 'productImage', 'category']
        })
        if(!product){
            throw new NotFoundException('product Not Found')
        }
        return product
    }

    async getByCategory(filter: string): Promise<Product[]> {
        const filterFormatted = filter.replace('-', ' ')
        const result =  this.productRepository.find({
            relations: ['sizes', 'brand', 'productImage', 'category'],
            where: {
                'category': { name: [filterFormatted] }
            }
        });
        
        if(!result){
            throw new NotFoundException('product Not Found')
        }

        return result
    }

    async getByKeyword(keyword: string) {
        if(keyword == ''){
            return await this.getAll()
        }
        const result = await this.productRepository.find({
            relations: ['sizes', 'brand', 'productImage', 'category'],
            where: [
                { name: Like(`%${keyword}%`) },
                { description: Like(`%${keyword}%`) },
                { brand: {name: Like(`%${keyword}%`)}}
            ]
        })

        if(!result){
            throw new NotFoundException('product Not Found')
        }

        return result
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

        if(product.sizes.length == 0){
            throw new NotFoundException('No Size Found')
        }

        product.brand = await this.brandRepository.findOne({ where: { name: data.brand } })
        if(!product.brand){
            throw new NotFoundException('No Brand Found')
        }

        product.category = await this.categoryRepository.findOne({ where: { name: data.category } })
        if(!product.category){
            throw new NotFoundException('No Category Found')
        }

        await this.productRepository.save(product)

        return product
    }

    async update(id:number, updateProductDto: UpdateProductDto, images?: any){

        const isProductExist = await this.getById(id)
        if(!isProductExist){
            throw new NotFoundException('No Product with that id')
        }

        if(images.length !== 0)      // if images is updated, concat the existing images with the new images
        {
            const existingImages = (await this.getById(id)).productImage
            const oldImages = existingImages.map((image: any) => {
                return {
                    fileName: image.fileName
                }
            })

            const newImages = images.map((image: any) => {
                return {
                    fileName: image.filename,
                };
            });

            const updatedImages = oldImages.concat(newImages)

            await this.productRepository.save({id: id, productImage: updatedImages, ...updateProductDto})

            //Remove old relation 
            const oldImageRecord = await this.imageRepository.find({
                relations: ['product'],
                where: {product: null}
            })
            await this.imageRepository.remove(oldImageRecord)

            return await this.getById(id)
        }
        
        //if image not updated, then update the rest
        await this.productRepository.save({id: id, ...updateProductDto} )
        return await this.getById(id)
    }

    async delete(id:number){
        const isProductExist = await this.getById(id)
        
        if(!isProductExist){
            throw new NotFoundException('No Product with that id')
        }

        isProductExist.productImage.forEach((image) => {
            this.deleteProductImage(image.fileName)
        })

        return await this.productRepository.remove(isProductExist)
    }

    async deleteProductImage(fileName: string) {
        
        await unlinkAsync(`./images/products/${fileName}`)
    
    }


}
