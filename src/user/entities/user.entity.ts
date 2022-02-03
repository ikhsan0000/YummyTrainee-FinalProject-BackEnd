import { Cart } from "src/cart/entities/cart.entity";
import { Transaction } from "src/transactions/entity/transaction.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fullName:string;

    @Column()
    password:string;

    @Column({ unique: true })
    email:string;

    @Column()
    hashedRt?:string;

    @OneToOne(
        () => Cart,
        (cart:Cart) => cart.user,
        { cascade: true }
    )
    cart: Cart;

    @OneToMany(
        () => Transaction,
        (transaction) => transaction.user,
        { cascade: true }

    )
    transactions: Transaction[]
}