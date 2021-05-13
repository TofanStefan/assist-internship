import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ItemService } from '../services/item.service'
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from '../entities/item.entity';
import { UpdateResult } from 'typeorm';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) : Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number)  {
      return this.itemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateItemDto: UpdateItemDto) :Promise <Item> {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) : Promise<Item>  {
   return this.itemService.remove(id);
  }
}
