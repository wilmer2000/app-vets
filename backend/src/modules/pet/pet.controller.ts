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
import { PetService } from './pet.service.js';
import { CreatePetDto } from './dto/create-pet.dto.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';
import { Pet } from '@prisma/client';
import { QueryPetDto } from './dto/query-pet.dto.js';

@ApiBearerAuth()
@Controller({ path: 'pet' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  async create(@Body() dto: CreatePetDto): Promise<Partial<Pet>> {
    return this.petService.create(dto);
  }

  @Get()
  async findAll(@Query() query: QueryPetDto): Promise<Partial<Pet>[]> {
    return this.petService.findAll(query);
  }

  @Get(':petId')
  async findOne(@Param('petId') petId: string): Promise<Partial<Pet>> {
    return this.petService.findOne(petId);
  }

  @Patch(':petId')
  async update(
    @Param('petId') petId: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<Partial<Pet>> {
    return this.petService.update(petId, updatePetDto);
  }

  @Delete(':id')
  async remove(@Param('id') petId: string): Promise<string> {
    return this.petService.remove(petId);
  }
}
