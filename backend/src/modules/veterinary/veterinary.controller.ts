import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service.js';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto.js';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto.js';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';
import { QueryVeterinaryDto } from './dto/query-veterinary.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller({ path: 'veterinary' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class VeterinaryController {
  constructor(private readonly veterinaryService: VeterinaryService) {}

  @Post()
  create(@Body() createVeterinaryDto: CreateVeterinaryDto) {
    return this.veterinaryService.create(createVeterinaryDto);
  }

  @Get()
  findAll(@Query() query: QueryVeterinaryDto) {
    return this.veterinaryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veterinaryService.findOne(id);
  }

  @Get('veterinary/:id')
  findByVeterinary(@Param('id') veterinaryId: string) {
    return this.veterinaryService.findByVeterinary(veterinaryId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVeterinaryDto: UpdateVeterinaryDto,
  ) {
    return this.veterinaryService.update(id, updateVeterinaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veterinaryService.remove(id);
  }
}
