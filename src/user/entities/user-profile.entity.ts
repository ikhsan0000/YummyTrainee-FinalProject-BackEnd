import { Product } from "src/products/entities/product.entitiy";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserFavorites } from "./user-favorites.entity";
import { User } from "./user.entity";

@Entity('user_profiles')
export class UserProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    address: string;

    @Column()
    profilePicture: string;

    @JoinColumn()
    @OneToOne(
        () => User,
        (user: User) => user.userProfile,
        { onDelete: 'CASCADE' }
    )
    user: User;

    @JoinColumn({name:'users_favorite'})
    @OneToOne(
        () => UserFavorites,
        { cascade: true}
    )
    userFavorites: UserFavorites;


}