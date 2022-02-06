import { Product } from "src/products/entities/product.entitiy";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "./user-profile.entity";
import { User } from "./user.entity";

@Entity('user_favorites')
export class UserFavorites {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(
        () => Product, 
        { cascade: true, eager: true }
    )
    @JoinTable({name: 'user_favorite_products'})
    product: Product[]


}