import { Module } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { Item } from './item/entities/item.entity'
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
const Config  :PostgresConnectionOptions =  {

  type : 'postgres',
  host : 'localhost',
  port : 4321,
  username : 'stefan',
  password : '123456',
  database :  'stefan',
  entities : [Item,User],
  synchronize : true,

}
@Module({
  imports: [TypeOrmModule.forRoot(Config),ItemModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
