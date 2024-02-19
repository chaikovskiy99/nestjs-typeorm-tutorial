import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  CreateUserDto,
  UserUpdateDto,
} from './dto/users.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
@Injectable()
export class UserController {
  constructor(private readonly userService: UsersService) { }


  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.delete(id)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() userUpdateDto: UserUpdateDto) {
    return await this.userService.updateUser(userUpdateDto, id)
  }

  @Get()
  async getUsers(): Promise<User[] | null> {
    return await this.userService.getAllUsers()
  }

  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  @Post()
  async addUser(@Body() user: CreateUserDto) {
    return await this.userService.addUser(user)
  }
}