import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable, JoinColumn, CreateDateColumn } from "typeorm";
import { TransactionItem } from "./transaction-item.entity";


@Entity('transactions')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => User,
        (user) => user.transactions
    )
    @JoinColumn()
    user: User

    @CreateDateColumn()
    createdAt: string

    @Column()
    address: string;

    @Column()
    shippingFee: number;

    @Column()
    totalPrice: number;

    @OneToMany(
        () => TransactionItem,
        (transactionItem) => transactionItem.transaction,
        { cascade: true }
    )
    transactionItems: TransactionItem[]

}