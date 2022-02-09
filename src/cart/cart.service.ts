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

        if(!currentCart){
            throw new NotFoundException('No Cart Found')
        }

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

        if(!currentCart) {
            throw new NotFoundException('No Cart Found')
        }

        const currentCartToProduct = await this.cartToProductRepository.find({
            relations:['cart', 'product'],
            where: { cart: { id: currentCart.id } }
        })

        if(!currentCartToProduct){
            throw new NotFoundException('No Cart Item Found')
        }

        return currentCartToProduct
    }

    async getCartToProductById(cartToProductId: number){

        const currentCartToProduct = await this.cartToProductRepository.findOne(cartToProductId)
        if(!currentCartToProduct){
            throw new NotFoundException('No Cart Item Found')
        }
        return currentCartToProduct
    }

    async addToCart(userId:number, data: AddToCartDto){

        // !!!  this behave normally !!!
        // const cart = await this.getByUserId(userId)
        
        // !!! this doesn't save to CartToProduct Table, need future investigation !!! 
        // const cart =  await this.cartRepository.findOne({ 
        //     relations: ['products', 'user', 'cartToProduct'],
        //     where: { user: { id: userId } }
        // })

        // return existingItems
        
        const items = await this.productRepository.find({id: data.productId})

        if(items.length === 0){
            throw new NotFoundException('product not found!')
        }
        
        const cart = await this.getByUserId(userId)

        const existingCartToProduct = await this.cartRepository.findOne(cart.id, {
            relations:['cartToProduct']
        })
        
        const cartToProducts =  await this.cartToProductRepository.find({
            relations:['product'],
            where: {cart: {id: cart.id}}
        })
       
        
        //check if the item is already in user's cart     
        let cartToProductItemAlreadyExist = null
        cartToProducts.forEach(element => {
            if(element.product.id == data.productId && element.size == data.size){
                cartToProductItemAlreadyExist = element

            }
        });

        // if already exist, then add the quantity
        if(cartToProductItemAlreadyExist !== null){
            await this.cartToProductRepository.update(cartToProductItemAlreadyExist.id, {quantity: cartToProductItemAlreadyExist.quantity + data.quantity })
            return cartToProductItemAlreadyExist
        }
        
        const newItems = cart.products.concat(items)
        cart.products = newItems
        

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
        if(!currentCartToProduct){
            throw new NotFoundException('Cart Item Not Found')
        }
        
        currentCartToProduct.quantity = data.quantity

        return await this.cartToProductRepository.save(currentCartToProduct)
    }

    async deleteOne(userId: number, cartToProductId: any){
        const currentCartToProduct = await this.cartToProductRepository.findOne({
            relations:['cart', 'product'],
            where: { id: cartToProductId }
        })

        if(!currentCartToProduct){
            throw new NotFoundException('No Cart Item Found')
        }

        const productId = currentCartToProduct.product.id

        await this.cartToProductRepository.delete({id: cartToProductId})

        const currentCart =  await this.cartRepository.findOne({ 
            relations: ['products', 'user'],
            where: { user: { id: userId } }
        })

        currentCart.products = currentCart.products.filter(product => {
            return product.id != productId
        })

        return await this.cartRepository.save(currentCart)
    }

    async deleteAllFromCart(userId:number){
        const currentCart =  await this.cartRepository.findOne({ 
            relations: ['products', 'user'],
            where: { user: { id: userId } }
        })
        if(!currentCart){
            throw new NotFoundException('No Cart Found')
        }
        const currentUser = await this.userService.getById(userId)

        const emptyCart = new Cart()
        emptyCart.user = currentUser

        await this.cartRepository.delete(currentCart.id)
        return await this.cartRepository.save(emptyCart)
    }

}
