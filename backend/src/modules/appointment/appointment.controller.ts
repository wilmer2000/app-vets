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
import { AppointmentService } from './appointment.service.js';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import { Appointment } from '../../../prisma/generated/prisma/client.js';

@ApiBearerAuth()
@Controller({ path: 'appointment' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(
    @Body() dto: CreateAppointmentDto,
  ): Promise<Partial<Appointment>> {
    return this.appointmentService.create(dto);
  }

  @Get()
  async findAll(): Promise<Partial<Appointment[]>> {
    return this.appointmentService.findAll();
  }

  @Get(':appointmentId')
  async findOne(
    @Param('appointmentId') appointmentId: string,
  ): Promise<Partial<Appointment>> {
    return this.appointmentService.findOne(appointmentId);
  }

  @Patch(':appointmentId')
  async update(
    @Param('appointmentId') appointmentId: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Partial<Appointment>> {
    return this.appointmentService.update(appointmentId, updateAppointmentDto);
  }

  @Delete(':appointmentId')
  async remove(@Param('appointmentId') appointmentId: string): Promise<string> {
    return this.appointmentService.remove(appointmentId);
  }
}
