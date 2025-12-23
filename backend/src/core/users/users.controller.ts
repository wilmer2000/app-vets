import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUsertDto } from './dtos/update-user.dto.js';
import { User } from '../../../prisma/generated/prisma/client.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUsertDto,
  ): Promise<Partial<User>> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string): Promise<string> {
    return this.usersService.delete(id);
  }

  @Get()
  getUsers(): Promise<Partial<User>[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<Partial<User>> {
    return this.usersService.getUserById(id);
  }
}
