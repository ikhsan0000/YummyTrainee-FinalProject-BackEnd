import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    username:string;

    @Column()
    fullName:string;

    @Column()
    password:string;

    @Column({ unique: true })
    email:string;

    @Column()
    hashedRt?:string;
}