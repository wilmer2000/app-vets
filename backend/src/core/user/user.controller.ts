import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { Role, User } from '../../../prisma/generated/prisma/client.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/role.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { QueryUserDto } from './dtos/query-user.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller({ path: 'user' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: QueryUserDto): Promise<Partial<User>[]> {
    return this.usersService.findAll(query);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<Partial<User>> {
    return this.usersService.findOne(userId);
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string): Promise<string> {
    return this.usersService.delete(userId);
  }
}
