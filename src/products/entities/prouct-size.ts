import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('product_sizes')
export class Size {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
}