import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
        return await this.productSizeRepository.findOne({ name });
    }

    async create(data: any){
        const newSize =  this.productSizeRepository.create({...data})
        return await this.productSizeRepository.save(newSize)
    }

    async delete(id: number){
        const isSizeExist = await this.productSizeRepository.findOne({id})
        if(!isSizeExist){
            throw new NotFoundException('size not found!')
        }
        return await this.productSizeRepository.remove(isSizeExist)
    }

}
