import { Cart } from "src/cart/entities/cart.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
}