import { type } from 'os';
import { Item } from 'src/item/entities/item.entity';
import {Entity,Column,PrimaryGeneratedColumn, OneToMany} from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable : true})
    username : string;

    @Column()
    first_name : string;

    @Column()
    last_name : string;

    @Column({nullable :true})
    email: string
    
    @Column({nullable :true})
    password : string;

    @Column({nullable :true})
    access_token : string;

    @Column({nullable :true})
    refresh_token:string;

    @Column({nullable :true})
    strava_id : number;

    @Column({nullable : true})
    expires_at : Date;
    
    @OneToMany(type=> Item, item => item.user,{
        cascade: true
    })
    item : Item[]

    constructor(expires_at:Date,refresh_token:string,access_token:string){
        this.expires_at = expires_at;
        this.refresh_token = refresh_token;
        this.access_token = access_token;

    }

}
