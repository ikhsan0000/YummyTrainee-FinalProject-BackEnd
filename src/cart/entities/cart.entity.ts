import { Product } from "src/products/entities/product.entitiy";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable, OneToOne } from "typeorm";


@Entity('carts')
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(
        () => User,
        (user:User) => user.cart,
        { cascade: true }
    )
    user: User;

    @JoinTable()
    @ManyToMany(
        () => Product,
        (product: Product) => product.name,
        { cascade: true }
    )
    products: Product[]

}