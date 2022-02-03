import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('sizes')
export class Size {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
}