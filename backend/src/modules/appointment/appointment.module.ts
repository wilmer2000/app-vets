import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { AppointmentController } from './appointment.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { VetsService } from '../vets/vets.service.js';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaService, VetsService],
})
export class AppointmentModule {}
