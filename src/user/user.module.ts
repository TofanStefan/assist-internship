import { Module } from '@nestjs/common';
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Item])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
