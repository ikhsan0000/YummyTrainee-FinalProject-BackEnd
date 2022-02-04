import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorator';
import { CartService } from './cart.service';
import { EditQuantityDto } from './dto/editQuantity.dto';

@Controller('cart')
export class CartController {

    constructor(private cartService: CartService){}

    @Get()
    currentUserCart(@GetCurrentUser('sub') userId:number){
        return this.cartService.getByUserId(userId)
    }

    @Get('/details')
    currentUserCartToProduct(@GetCurrentUser('sub') userId:number){
        return this.cartService.getCartToProduct(userId)
    }

    @Get('/details/:id')
    currentCartToProductById(@Param('id') cartToProductId:number){
        return this.cartService.getCartToProductById(cartToProductId)
    }

    @Post()
    addToCart(
        @GetCurrentUser('sub') userId:number,
        @Body() productId: any
    ){
        return this.cartService.addToCart(userId, productId)
    }

    @Patch()
    editCart(
        @Body() editQuantityDto: EditQuantityDto
    ){
        return this.cartService.updateQuantity(editQuantityDto)
    }

    @Delete('/:id')
    deleteItemFromCart(
        @GetCurrentUser('sub') userId:number,
        @Param('id') cartToProductId: any
    ){
        return this.cartService.deleteOne(userId, cartToProductId)
    }
}
