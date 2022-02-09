import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionItem } from './entity/transaction-item.entity';
import { Transaction } from './entity/transaction.entity';

@Injectable()
export class TransactionsService {


    constructor(
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(TransactionItem) private readonly transactionItemRepository: Repository<TransactionItem>,
        private readonly userService: UserService,
        private readonly cartService: CartService
    ) { }

    async getCurrentTransactions(userId: number) {
        return await this.transactionRepository.find({
            relations: ['user', 'transactionItems'],
            where: { user: { id: userId } }
        })
    }

    async createTransaction(userId: number, data: CreateTransactionDto) {
        let transaction = new Transaction()
        let transactionItem = []
        const currentUser = await this.userService.getById(userId)
        const currentCart = await this.cartService.getCartToProduct(userId)
        if(!currentCart){
            throw new NotFoundException('No Cart Found')
        }

        transaction.address = data.address
        transaction.shippingFee = data.shippingFee
        transaction.totalPrice = data.totalPrice
        transaction.user = currentUser

        currentCart.forEach((item) => {
            let tmpTransactionItem = new TransactionItem()
            tmpTransactionItem.name = item.product.name
            tmpTransactionItem.size = item.size
            tmpTransactionItem.quantity = item.quantity
            tmpTransactionItem.image = item.image
            tmpTransactionItem.price = item.product.price
            transactionItem.push(tmpTransactionItem)
        })

        transaction.transactionItems = transactionItem

        // delete items on cart
        await this.cartService.deleteAllFromCart(userId)

        return await this.transactionRepository.save(transaction)
    }
}
