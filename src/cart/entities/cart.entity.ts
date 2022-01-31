import { Product } from "src/products/entities/product.entitiy";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { CartToProduct } from "./cartToProduct.entity";


@Entity('carts')
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(
        () => User,
        (user:User) => user.cart,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn()
    user: User;

    @JoinTable()
    @ManyToMany(
        () => Product,
        (product: Product) => product.name,
        { cascade: true }
    )
    products: Product[]

    @OneToMany(
        () => CartToProduct, 
        cartToProduct => cartToProduct.cart,
        { cascade: true }
    )
    cartToProduct: CartToProduct[]

}