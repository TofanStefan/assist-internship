import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from 'src/item/dto/create-item.dto';
import { Item } from 'src/item/entities/item.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository : Repository<User>,
    @InjectRepository(Item) private readonly itemRepository : Repository<Item>
  ){}
  async create(createUserDto: CreateUserDto) : Promise<string | any> {
    
    // find user by email or username
    let user =  await this.userRepository.findOne(
      {
        where: [
          { email: createUserDto.email },
          { username: createUserDto.username }
        ]
      })
    
    // if no user found  create new user 
    if(!user){
      user  = await this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    }

    // if user  found  => bad request 
    let errorMessage
    if(user.email === createUserDto.email)
        errorMessage = "Email is registered to another account"
    else
       errorMessage = "Username is taken"
    throw new BadRequestException({error : errorMessage});

  }

  async findAll() :Promise<User[]> {
    const users = await this.userRepository.find({relations : ['item']})
    return users;
  }

 async findOne(id: number) : Promise<User> {
    try{
      const user = await this.userRepository.findOneOrFail(
        {
          where : {id},
          relations : ['item']
        })
        
      return user
    }catch(error){
      throw new NotFoundException({error})
    }
    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      await this.userRepository.update(id,updateUserDto);
     }catch(error){
       throw new BadRequestException({error})
     }
      return this.findOne(id)
  }

 async remove(id: number) : Promise<Item|any> {
    const item = await this.userRepository.delete(id);
    if(item.affected===0)
      throw new NotFoundException();
    return item
  }

  // add items to user  => takes id and itemDTO
  async addItem(userId:number,createItemDto : CreateItemDto) : Promise<User>{

      const user = await this.findOne(userId);
      const item = this.itemRepository.create(createItemDto)
      user.item.push(item)

     return this.userRepository.save(user);
  }
}
