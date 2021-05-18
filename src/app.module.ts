import { Module } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { Item } from './item/entities/item.entity'
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { StravaAuthModule } from './strava-auth/strava-auth.module';
import { ConfigModule } from '@nestjs/config';
import { StravaActivitiesModule } from './strava-activities/strava-activities.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(
      {

        type : "postgres",
        host : process.env.DB_HOST,
        port : Number(process.env.DB_PORT),
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database :  process.env.DB_NAME,
        entities : [Item,User],
        synchronize : true,
      
      }
    ),
    ItemModule, UserModule, StravaAuthModule, StravaActivitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
