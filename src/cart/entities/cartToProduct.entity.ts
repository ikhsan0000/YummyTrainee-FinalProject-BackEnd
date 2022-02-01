import { Product } from "src/products/entities/product.entitiy";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class CartToProduct {
    @PrimaryGeneratedColumn()
    cartToProductId: number;

    @Column({default: 1})
    quantity: number;

    @Column()
    size: string

    @Column()
    image: string

    @ManyToOne(
        () => Cart,
        cart => cart.cartToProduct,
        { onDelete: "CASCADE" }
    )
    @JoinColumn()
    cart: Cart;
    
    @ManyToOne(() => Product, product => product.cartToProduct)
    @JoinColumn()
    product: Product;
}