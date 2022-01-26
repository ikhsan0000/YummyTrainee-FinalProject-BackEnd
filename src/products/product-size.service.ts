import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/prouct-size.entity';

@Injectable()
export class ProductSizeService {

    constructor(
        @InjectRepository(Size) private readonly productSizeRepository: Repository<Size>,
    ) { }

    async getAll() {
        return this.productSizeRepository.find();
    }

    async getByName(name: string) {
        return this.productSizeRepository.findOne({ name });
    }

}
