import { IsNotEmpty } from "class-validator"
import { User } from "src/user/entities/user.entity"
import { TransactionItem } from "../entity/transaction-item.entity"

export class CreateTransactionDto
{

    @IsNotEmpty()
    address: string
    
    @IsNotEmpty()
    shippingFee: number
    
    @IsNotEmpty()
    totalPrice: number
}