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
@Roles(Role.ADMIN, Role.USER, Role.VET)
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

  // Owners

  @Get(':id/owner/list')
  findOwners(@Param('id') id: string) {
    return this.veterinaryService.findOwners(id);
  }

  @Post(':id/owner/:ownerId')
  addOwner(@Param('id') id: string, @Param('ownerId') ownerId: string) {
    return this.veterinaryService.addOwner(id, ownerId);
  }

  @Delete(':id/owner/:ownerId')
  removeOwner(@Param('id') id: string, @Param('id') ownerId: string) {
    return this.veterinaryService.removeOwner(id, ownerId);
  }
}
