import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('user_profiles')
export class UserProfile {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fullName:string;

    @Column()
    address:string;
    
    @Column()
    profilePicture: string;

    @JoinColumn()
    @OneToOne(
        () => User,
        (user:User) => user.userProfile,
        { onDelete: 'CASCADE' }
    )
    user: User;
    


}