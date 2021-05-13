import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';

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
    }