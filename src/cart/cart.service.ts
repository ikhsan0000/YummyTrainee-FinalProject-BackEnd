import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entitiy';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/addToCart.dto';
import { EditQuantityDto } from './dto/editQuantity.dto';
import { Cart } from './entities/cart.entity';
import { CartToProduct } from './entities/cartToProduct.entity';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(CartToProduct) private readonly cartToProductRepository: Repository<CartToProduct>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userService: UserService,
    ){}

    async getByUserId(userId: number){
        const currentCart =  await this.cartRepository.findOne({ 
            relations: ['products', 'user', 'cartToProduct'],
            where: { user: { id: userId } }
        })

        // // this is to find all current cart of cartToProduct
        // const currentCartToProduct = await this.cartToProductRepository.find({
        //     relations:['cart', 'product'],
        //     where: { cart: { id: currentCart.id } }
        // })

        // Return without the user object, as the user contain password and hashRt
        return {
            id: currentCart.id,
            products: currentCart.products,
            // cartToProduct: currentCart.cartToProduct
        }
    }

    async getCartToProduct(userId: number){
        const currentCart =  await this.cartRepository.findOne({ 
            relations: ['user', 'cartToProduct'],
            where: { user: { id: userId } }
        })

        const currentCartToProduct = await this.cartToProductRepository.find({
            relations:['cart', 'product'],
            where: { cart: { id: currentCart.id } }
        })

        return currentCartToProduct
    }

    async getCartToProductById(cartToProductId: number){

        const currentCartToProduct = await this.cartToProductRepository.findOne(cartToProductId)

        return currentCartToProduct
    }

    async addToCart(userId:number, data: AddToCartDto){

        // const items = await ids.forEach(async id => {
        //     return await this.productRepository.findOne(id)
        // })

        // !!!  this behave normally !!!
        const existingItems = await this.getByUserId(userId)
        
        // !!! this doesn't save to CartToProduct Table, need future investigation !!! 
        // const existingItems =  await this.cartRepository.findOne({ 
        //     relations: ['products', 'user', 'cartToProduct'],
        //     where: { user: { id: userId } }
        // })

        // return existingItems
        
        const items = await this.productRepository.find({id: data.productId})

        if(items.length === 0){
            throw new NotFoundException('product not found!')
        }
        
        const newItems = existingItems.products.concat(items)

        const cart = await this.getByUserId(userId)
        cart.products = newItems
        
        const existingCartToProduct = await this.cartRepository.findOne(existingItems.id, {
            relations:['cartToProduct']
        })

        let newCartToProduct = new Array

        let cartToProduct = new CartToProduct()
        cartToProduct.product = items[0]
        cartToProduct.size = data.size
        cartToProduct.quantity = data.quantity
        cartToProduct.image = data.image
        
        if(existingCartToProduct.cartToProduct.length > 0){
            existingCartToProduct.cartToProduct.forEach(product => {
                newCartToProduct.push(product)
            })
        }
        
        newCartToProduct.push(cartToProduct)
        
        return await this.cartRepository.save({cartToProduct: newCartToProduct, ...cart})

    }

    async updateQuantity(data: EditQuantityDto){
        // const cart = await this.getByUserId(userId)
        
        const currentCartToProduct = await this.cartToProductRepository.findOne(data.cartToProductId, {
            relations:['cart', 'product'],
        })
        
        currentCartToProduct.quantity = data.quantity

        return await this.cartToProductRepository.save(currentCartToProduct)
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

    async deleteAllFromCart(userId:number){
        const currentCart =  await this.cartRepository.findOne({ 
            relations: ['products', 'user'],
            where: { user: { id: userId } }
        })
        const currentUser = await this.userService.getById(userId)

        const emptyCart = new Cart()
        emptyCart.user = currentUser

        await this.cartRepository.delete(currentCart.id)
        return await this.cartRepository.save(emptyCart)
    }

}
