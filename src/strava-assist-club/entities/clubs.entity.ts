import { Column } from "typeorm";

export class Clubs {

    @Column()
    club_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({nullable:true})
    club_type: string;

    @Column()
    sport_type: string;

    @Column({nullable:true})
    profile_photo: string;

    @Column()
    city: string;

    @Column({nullable:true})
    state: string;

    @Column({nullable:true})
    country: string;

    @Column({nullable:true})
    member_count: number;

    // club -> club activities relationship to be done 


    


}
