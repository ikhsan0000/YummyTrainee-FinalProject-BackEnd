import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entitiy';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/addToCart.dto';
import { Cart } from './entities/cart.entity';
import { CartToProduct } from './entities/cartToProduct.entity';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        private readonly userService: UserService,
    ){}

    async getByUserId(userId: number){
        const currentCart =  await this.cartRepository.findOne({ 
            relations: ['products', 'user'],
            where: { user: { id: userId } }
        })

        // Return without the user object, as the user contain password and hashRt
        return {id: currentCart.id, products: currentCart.products}
    }

    async addToCart(userId:number, data: AddToCartDto){

        // const items = await ids.forEach(async id => {
        //     return await this.productRepository.findOne(id)
        // })
        const existingItems = await this.getByUserId(userId)
        
        const items = await this.productRepository.find({id: data.productId})
        
        const newItems = existingItems.products.concat(items)

        const cart = await this.getByUserId(userId)
        cart.products = newItems
        
        const existingCartToProduct = await this.cartRepository.findOne(existingItems.id, {
            relations:['cartToProduct']
        })
        
        let newCartToProduct = new Array

        let cartToProduct = new CartToProduct()
        cartToProduct.product = items[0]
        cartToProduct.quantity = data.quantity
        
        if(existingCartToProduct.cartToProduct.length > 0){
            existingCartToProduct.cartToProduct.forEach(product => {
                newCartToProduct.push(product)
            })
        }
        
        newCartToProduct.push(cartToProduct)
        
        return await this.cartRepository.save({cartToProduct: newCartToProduct, ...cart})

    }

    async deleteOne(userId: number, data: any){
        const currentCart =  await this.cartRepository.findOne({ 
            relations: ['products', 'user'],
            where: { user: { id: userId } }
        })

        currentCart.products = currentCart.products.filter(product => {
            return product.id !== data.itemId
        })

        return await this.cartRepository.save(currentCart)
    }

    async deleteAllFromCart(userId:number, productId: AddToCartDto){
        const currentCart =  await this.cartRepository.findOne({ 
            relations: ['products', 'user'],
            where: { user: { id: userId } }
        })

        const emptyCart = new Cart()
        

        await this.cartRepository.delete(currentCart)
        return await this.userService.update({...emptyCart})
    }
}
