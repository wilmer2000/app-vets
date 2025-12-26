import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service.js';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto.js';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto.js';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';

@Controller({ path: 'veterinary', version: '1' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class VeterinaryController {
  constructor(private readonly veterinaryService: VeterinaryService) {}

  @Post()
  create(@Body() createVeterinaryDto: CreateVeterinaryDto) {
    return this.veterinaryService.create(createVeterinaryDto);
  }

  @Get()
  findAll() {
    return this.veterinaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veterinaryService.findOne(id);
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
