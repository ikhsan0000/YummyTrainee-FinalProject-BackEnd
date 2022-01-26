import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Brand } from "./brand.entity";
import { ProductImage } from "./product-image";
import { Size } from "./prouct-size";


@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    price:number;

    @OneToMany(() => ProductImage, (prodImage) => prodImage.product )
    productImage: ProductImage[];

    @ManyToMany(() => Size)
    @JoinTable()
    sizes: Size[]

    @ManyToOne(() => Brand, (brand) => brand.productList)
    brand: Brand;
}