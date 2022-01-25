import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorator';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {

    @Public()
    @Get()
    getAll(){

    }

    @Public()
    @Get('/:id')
    getProductById(@Param('id') id: string){
        
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createProduct(
        @Body() productDto: ProductDto,
        @UploadedFile() file: Express.Multer.File
    ): any{
        console.log(productDto);
    }
}
