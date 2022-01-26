import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entitiy";

@Entity('product_images')
export class ProductImage {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fileName:string;

    @ManyToOne(() => Product, (product) => product.productImage)
    product: Product;
}