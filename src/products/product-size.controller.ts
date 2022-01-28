import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/common/decorator';
import { CreateSizeDto } from './dto/create-size.dto';
import { ProductSizeService } from './product-size.service';

@Controller('size')
export class ProductSizeController {

    constructor(private productSizeService: ProductSizeService){}

    @Public()
    @Get()
    getAll(@Query() filter: string){
        return this.productSizeService.getAll(filter)
    }

    @Public()
    @Post()
    create(@Body() createSizeDto: CreateSizeDto){
        return this.productSizeService.create(createSizeDto)
    }

    @Public()
    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.productSizeService.delete(id)
    }


}
