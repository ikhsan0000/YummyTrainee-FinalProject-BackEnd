import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entitiy';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) { }


    async getAll() {
        return this.productRepository.find({ relations: ['attendees'] });
    }
}
