import { CartToProduct } from "src/cart/entities/cartToProduct.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Brand } from "./brand.entity";
import { Category } from "./category.entity";
import { ProductImage } from "./product-image";
import { Size } from "./prouct-size.entity";


@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @OneToMany(
        () => ProductImage,
        (prodImage) => prodImage.product,
        { cascade: true, eager: true}
    )
    productImage: ProductImage[];

    @JoinTable()
    @ManyToMany(
        type => Size,
        (size:Size) => size.name,
        { cascade: true, eager: true}
    )
    sizes: Size[]

    @JoinTable()
    @ManyToOne(
        () => Category,
        (category) => category.name,
        { onDelete: 'CASCADE', eager: true}
    )
    category: Category

    @ManyToOne(
        () => Brand,
        (brand) => brand.productList,
        { onDelete: 'CASCADE', eager: true}
    )
    brand: Brand;

    @OneToMany(
        () => CartToProduct, 
        cartToProduct => cartToProduct.product,
        { cascade: true }
    )
    cartToProduct: CartToProduct[]

}