import { Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/common/decorator';
import { ProductSizeService } from './product-size.service';

@Controller('size')
export class ProductSizeController {

    constructor(private productSizeService: ProductSizeService){}

    @Public()
    @Get()
    getAll(){
        return this.productSizeService.getAll()
    }
    @Public()
    @Get('/find')
    getOneByName(@Query() param: string){
        return this.productSizeService.getByName(param['name'])
    }



}