import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./product.entitiy";

@Entity('brands')
export class Brand {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    name:string;

    @OneToMany(() => Products, (product) => product.brand)
    productList: Products[]

}