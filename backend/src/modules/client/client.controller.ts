import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { Client, Role } from '../../../prisma/generated/prisma/client.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';

@ApiBearerAuth()
@Controller({ path: 'client' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() dto: CreateClientDto): Promise<Partial<Client>> {
    return await this.clientService.create(dto);
  }

  @Get()
  async findAll(): Promise<Partial<Client[]>> {
    return await this.clientService.findAll();
  }

  @Get(':clientId')
  async findOne(@Param('clientId') clientId: string): Promise<Partial<Client>> {
    return await this.clientService.findOne(clientId);
  }

  @Delete(':clientId')
  async remove(@Param('clientId') clientId: string): Promise<string> {
    return await this.clientService.remove(clientId);
  }
}
