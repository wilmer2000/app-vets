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
import { StaffService } from './staff.service.js';
import { CreateStaffDto } from './dto/create-staff.dto.js';
import { UpdateStaffDto } from './dto/update-staff.dto.js';
import { Role, Staff } from '../../../prisma/generated/prisma/client.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';

@ApiBearerAuth()
@Controller({ path: 'staff' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() dto: CreateStaffDto): Promise<Partial<Staff>> {
    return await this.staffService.create(dto);
  }

  @Get()
  async findAll(): Promise<Partial<Staff[]>> {
    return await this.staffService.findAll();
  }

  @Get(':staffId')
  async findOne(@Param('staffId') staffId: string): Promise<Partial<Staff>> {
    return await this.staffService.findOne(staffId);
  }

  @Patch(':staffId')
  async update(
    @Param('staffId') staffId: string,
    @Body() dto: UpdateStaffDto,
  ): Promise<Partial<Staff>> {
    return await this.staffService.update(staffId, dto);
  }

  @Delete(':staffId')
  async remove(@Param('staffId') staffId: string): Promise<string> {
    return await this.staffService.remove(staffId);
  }
}
