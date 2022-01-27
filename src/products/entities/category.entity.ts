import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entitiy";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    name:string;

    @OneToMany(() => Product, (product) => product.category)
    productList: Product[]

}