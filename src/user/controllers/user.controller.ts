import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { CreateItemDto } from 'src/item/dto/create-item.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) : Promise<string> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post(':userId')
  addItem(@Param('userId',ParseIntPipe) userId: number , @Body() createItemDto : CreateItemDto) {
    return this.userService.addItem(userId,createItemDto);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
