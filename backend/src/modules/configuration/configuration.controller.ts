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
import { ConfigurationService } from './configuration.service.js';
import { CreateConfigurationDto } from './dto/create-configuration.dto.js';
import { UpdateConfigurationDto } from './dto/update-configuration.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';

@ApiBearerAuth()
@Controller({ path: 'configuration' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Post()
  async create(@Body() dto: CreateConfigurationDto) {
    return this.configurationService.create(dto);
  }

  @Get()
  async findAll() {
    return this.configurationService.findAll();
  }

  @Get(':configId')
  async findOne(@Param('configId') configId: string) {
    return this.configurationService.findOne(configId);
  }

  @Patch(':configId')
  async update(
    @Param('configId') configId: string,
    @Body() dto: UpdateConfigurationDto,
  ) {
    return this.configurationService.update(configId, dto);
  }

  @Delete(':configId')
  async remove(@Param('configId') configId: string) {
    return this.configurationService.remove(configId);
  }
}
