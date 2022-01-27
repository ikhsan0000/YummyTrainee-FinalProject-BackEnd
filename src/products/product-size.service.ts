import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/prouct-size.entity';

@Injectable()
export class ProductSizeService {

    constructor(
        @InjectRepository(Size) private readonly productSizeRepository: Repository<Size>,
    ) { }

    async getAll(filter?: any) {
        const name = filter.name
        if(!name){
            return this.productSizeRepository.find();
        }
        return this.productSizeRepository.findOne({ name });

    }

}
