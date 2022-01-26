import { Body, Controller, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/common/decorator';
import { editFileName, imageFileFilter } from 'src/common/imageUtils/imageUtils';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductsController {

    @Public()
    @Get()
    getAll(){

    }

    @Public()
    @Get('/:id')
    getProductById(@Param('id') id: string){
        
    }
    
    @Public()
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './images/products',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    createProduct(
        @Body() productDto: CreateProductDto,
        @UploadedFile() file: Express.Multer.File
    ): any{
        return {
            productDto,
            file
        }
    }
}
