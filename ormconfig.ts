import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config : PostgresConnectionOptions = {

        type : "postgres",
        host : process.env.DB_HOST,
        port : Number(process.env.DB_PORT),
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        entities : ["dist/**/*.entity{.ts,.js}"],
        synchronize: false,
        migrations: [
          'dist/src/db/migrations/*.js'
        ],
        cli: {
          migrationsDir: 'src/db/migrations'
        }
      
}
export default config;