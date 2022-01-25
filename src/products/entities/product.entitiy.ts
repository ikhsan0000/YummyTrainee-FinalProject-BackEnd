import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Brand } from "./brand.entity";

export enum SizesEnum
{
  S = 1,
  M,
  L, 
  XL
}

@Entity('products')
export class Products {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    price:number;

    @Column()
    imageUrl:string;

    @Column('enum', {
        enum: SizesEnum,
        default: SizesEnum.S
    })
    sizes: SizesEnum[]

    @ManyToOne(() => Brand, (brand) => brand.productList)
    brand: Brand;
}