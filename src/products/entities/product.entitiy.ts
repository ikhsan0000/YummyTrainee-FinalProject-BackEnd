import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Brand } from "./brand.entity";
import { ProductImage } from "./product-image";
import { Size } from "./prouct-size.entity";


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
    
    @JoinTable()
    @ManyToMany(
        type => Size,
        (size) => size.name,
        {cascade: true}
        )
    sizes: Size[]

    @ManyToOne(
        () => Brand,
        (brand) => brand.productList,
    )
    brand: Brand;
}