import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import {
  OwnerProfile,
  Role,
  User,
  VetProfile,
} from '../../../prisma/generated/prisma/client.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/role.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { QueryUserDto } from './dtos/query-user.dto.js';
import { UpdateVetUserDto } from './dtos/update-vet-user.dto.js';
import { UpdateOwnerUserDto } from './dtos/update-owner-user.dto.js';
import { CreateOwnerUserDto } from './dtos/create-owner-user.dto.js';
import { ProfileService } from './profile.service.js';

@Controller({ path: 'user' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll(@Query() query: QueryUserDto): Promise<Partial<User>[]> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Partial<User>> {
    return this.usersService.findOne(id);
  }

  @Get('/owner-profile/:id')
  async getOwnerProfile(@Param('id') id: string): Promise<OwnerProfile> {
    return this.profileService.getOwnerProfile(id);
  }

  @Post('/owner-profile/:id')
  async setOwnerProfile(
    @Param('id') id: string,
    @Body() dto: CreateOwnerUserDto,
  ): Promise<OwnerProfile> {
    return this.profileService.setOwnerProfile(id, dto);
  }

  @Patch('/owner-profile/:id')
  async updateOwnerProfile(
    @Param('id') id: string,
    @Body() dto: UpdateOwnerUserDto,
  ): Promise<OwnerProfile> {
    return this.profileService.updateOwnerProfile(id, dto);
  }

  @Get('/vet-profile/:id')
  async getVetProfile(@Param('id') id: string): Promise<VetProfile> {
    return this.profileService.getVetProfile(id);
  }

  @Post('/vet-profile/:id')
  async setVetProfile(
    @Param('id') id: string,
    @Body() dto: UpdateVetUserDto,
  ): Promise<VetProfile> {
    return this.profileService.setVetProfile(id, dto);
  }
}
