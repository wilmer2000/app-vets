import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';

@ApiBearerAuth()
@Controller({ path: 'entity' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post()
  async create(@Body() dto: CreateEntityDto) {
    return await this.entityService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.entityService.findAll();
  }

  @Get(':entityId')
  async findOne(@Param('entityId') entityId: string) {
    return await this.entityService.findOne(entityId);
  }

  @Patch(':entityId')
  async update(
    @Param('entityId') entityId: string,
    @Body() dto: UpdateEntityDto,
  ) {
    return await this.entityService.update(entityId, dto);
  }

  @Delete(':entityId')
  async remove(@Param('entityId') entityId: string) {
    return await this.entityService.remove(entityId);
  }
}
