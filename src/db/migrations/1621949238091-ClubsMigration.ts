import {MigrationInterface, QueryRunner} from "typeorm";

export class ClubsMigration1621949238091 implements MigrationInterface {
    name = 'ClubsMigration1621949238091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clubs" ("club_id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "club_type" character varying, "sport_type" character varying NOT NULL, "profile_photo" character varying, "city" character varying NOT NULL, "state" character varying, "country" character varying, "member_count" integer, CONSTRAINT "PK_865b9a142053b65722a64066698" PRIMARY KEY ("club_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clubs"`);
    }

}
