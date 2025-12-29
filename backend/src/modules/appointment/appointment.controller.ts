import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role, Status } from '../../../prisma/generated/prisma/enums.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';
import { User } from '@prisma/client';

@Controller({ path: 'appointment' })
@Roles(Role.ADMIN, Role.USER, Role.VET, Role.OWNER)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const startTime = new Date(createAppointmentDto.startTime);
    const endTime = new Date(createAppointmentDto.endTime);

    if (startTime > endTime) {
      throw new InternalServerErrorException(
        'Start time must be before end time',
      );
    }

    const hasPets = !!createAppointmentDto.pets.length;
    const hasParticipants = !!createAppointmentDto.participants.length;
    if (!hasPets || !hasParticipants) {
      throw new InternalServerErrorException({
        message:
          'Participants should have at least one owner, one vet and one pet',
      });
    }

    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
