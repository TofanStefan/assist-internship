import { type } from 'os';
import { User } from 'src/user/entities/user.entity';
import {Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';

@Entity()
    export class Item {
        @PrimaryGeneratedColumn()
        id:number;

        @Column()
        name : string;

        @Column({nullable : true})
        description : string;

        @Column()
        quantity : number;
        
        @ManyToOne(type => User, user => user.id)
        user : User;
    }