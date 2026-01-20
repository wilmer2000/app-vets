import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service.js';
import { CreateServiceDto } from './dto/create-service.dto.js';
import { UpdateServiceDto } from './dto/update-service.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';

@ApiBearerAuth()
@Controller({ path: 'service' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Get()
  async findAll() {
    return this.serviceService.findAll();
  }

  @Get(':serviceId')
  async findOne(@Param('serviceId') serviceId: string) {
    return this.serviceService.findOne(serviceId);
  }

  @Patch(':serviceId')
  async update(
    @Param('serviceId') serviceId: string,
    @Body() dto: UpdateServiceDto,
  ) {
    return this.serviceService.update(serviceId, dto);
  }

  @Delete(':serviceId')
  async remove(@Param('serviceId') serviceId: string) {
    return this.serviceService.remove(serviceId);
  }
}
