import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUsertDto } from './dtos/update-user.dto.js';
import { User } from '../../../prisma/generated/prisma/client.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Partial<User>> {
    return this.usersService.registerUser(createUserDto);
  }

  // @Get('me')
  // me(): string {
  //   return this.usersService.updateUser();
  // }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUsertDto,
  ): Promise<Partial<User>> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: string): Promise<string> {
    return this.usersService.deleteUser(id);
  }
}
