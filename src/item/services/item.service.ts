import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateItemDto } from '../dto/create-item.dto'
import { UpdateItemDto } from '../dto/update-item.dto';
import {Item} from '../entities/item.entity'

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private readonly itemRepository : Repository<Item>){}
  create(createItemDto: CreateItemDto) :Promise<Item> {

     return this.itemRepository.save(createItemDto)

  }

 findAll() :Promise<Item []> {
    // get all items
    return  this.itemRepository.find()
  }

  async findOne(id: number) :Promise<Item> {
    try{
      // if user found by id send user
      const user = await this.itemRepository.findOneOrFail(id);
      return user;
    }catch(error){
      throw new NotFoundException(error);
    }
  }

 async update(id: number, updateItemDto: UpdateItemDto) :Promise<Item> {
    await this.itemRepository.update(id,updateItemDto);
    return this.findOne(id)
  }


  async remove(id: number) : Promise<Item> {
      const item = await this.itemRepository.findOne(id)
      if(item)
        return  this.itemRepository.remove(item);
      throw new NotFoundException()
  }
}
