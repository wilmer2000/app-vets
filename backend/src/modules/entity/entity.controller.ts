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
import { EntityService } from './entity.service.js';
import { CreateEntityDto } from './dto/create-entity.dto.js';
import { UpdateEntityDto } from './dto/update-entity.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';
import { Entity } from '../../../prisma/generated/prisma/client.js';

@ApiBearerAuth()
@Controller({ path: 'entity' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post()
  async create(@Body() dto: CreateEntityDto): Promise<Partial<Entity>> {
    return this.entityService.create(dto);
  }

  @Get()
  async findAll(): Promise<Partial<Entity[]>> {
    return this.entityService.findAll();
  }

  @Get(':entityId')
  async findOne(@Param('entityId') entityId: string): Promise<Partial<Entity>> {
    return this.entityService.findOne(entityId);
  }

  @Patch(':entityId')
  async update(
    @Param('entityId') entityId: string,
    @Body() dto: UpdateEntityDto,
  ): Promise<Partial<Entity>> {
    return this.entityService.update(entityId, dto);
  }

  @Delete(':entityId')
  async remove(@Param('entityId') entityId: string): Promise<string> {
    return this.entityService.remove(entityId);
  }
}
