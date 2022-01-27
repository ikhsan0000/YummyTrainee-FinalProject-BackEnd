import { Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/common/decorator';
import { editFileName, imageFileFilter } from 'src/common/imageUtils/imageUtils';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @Public()
    @Get()
    getAll() {
        return this.productsService.getAll();
    }

    @Public()
    @Get('/search')
    search(@Query('keyword') keyword: string){
        return this.productsService.getByKeyword(keyword)
    }


    @Public()
    @Get('/filter/category')
    getProductByCategory(@Query('category') filter: string) {
        return this.productsService.getByCategory(filter)
    }

    @Public()
    @Get('images/:imageUrl')
    getProductImage(@Param('imageUrl') image: string, @Res() res: any) {
        return res.sendFile(image, { root: './images/products' });
    }

    @Public()
    @Get('/:id')
    getProductById(@Param('id') id: number) {
        return this.productsService.getById(id)
    }



    @Public()
    @Post()
    @UseInterceptors(FilesInterceptor('files', 5, {
        storage: diskStorage({
            destination: './images/products',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    createProduct(
        @Body() createProductDto: CreateProductDto,
        @UploadedFiles() files: Array<Express.Multer.File>
    ): any {
        return this.productsService.create(createProductDto, files)
    }

}
