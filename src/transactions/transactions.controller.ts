import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService){}

    @Get()
    currentUserTransaction(@GetCurrentUser('sub') userId: number){
        return this.transactionsService.getCurrentTransactions(userId)
    }

    @Post()
    createTransaction(
        @GetCurrentUser('sub') userId: number,
        @Body() createTransactionDto: CreateTransactionDto
    ){
        return this.transactionsService.createTransaction(userId, createTransactionDto)
    }
}
