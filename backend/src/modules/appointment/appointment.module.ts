import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { AppointmentController } from './appointment.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaService],
})
export class AppointmentModule {}
