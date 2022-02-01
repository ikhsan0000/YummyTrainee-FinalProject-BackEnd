import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorator';
import { CartService } from './cart.service';
import { EditQuantityDto } from './dto/editQuantity.dto';

@Controller('cart')
export class CartController {

    constructor(private cartService: CartService){}

    @Get()
    currentCart(@GetCurrentUser('sub') userId:number){
        return this.cartService.getByUserId(userId)
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

    @Delete()
    deleteItemFromCart(
        @GetCurrentUser('sub') userId:number,
        @Body() productId: any
    ){
        return this.cartService.deleteOne(userId, productId)
    }
}
