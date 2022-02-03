import { Product } from "src/products/entities/product.entitiy";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class TransactionItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    size: string

    @Column()
    image: string

    @ManyToOne(
        () => Transaction,
        (transaction) => transaction.transactionItems,
        { onDelete: "CASCADE" }
    )
    transaction: Transaction
    
}