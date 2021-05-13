import { Module } from '@nestjs/common';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Item])
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
