import { Cart } from "src/cart/entities/cart.entity";
import { Transaction } from "src/transactions/entity/transaction.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "./user-profile.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id:number;

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

    @OneToOne(
        () => UserProfile,
        (userProfile) => userProfile.user,
        { cascade: true }
    )
    userProfile: UserProfile;
}