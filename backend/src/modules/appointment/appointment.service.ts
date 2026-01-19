import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Appointment } from '../../../prisma/generated/prisma/client.js';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto): Promise<Partial<Appointment>> {
    try {
      return this.prisma.appointment.create({
        data: {
          ...dto,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Partial<Appointment[]>> {
    try {
      return this.prisma.appointment.findMany({
        include: {
          service: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(appointmentId: string): Promise<Partial<Appointment>> {
    try {
      return await this.prisma.appointment.findUniqueOrThrow({
        where: { appointmentId },
        include: {
          entity: true,
          client: true,
          staff: true,
          service: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    appointmentId: string,
    dto: UpdateAppointmentDto,
  ): Promise<Partial<Appointment>> {
    try {
      return await this.prisma.appointment.update({
        where: { appointmentId },
        data: { ...dto },
        include: {
          entity: true,
          client: true,
          staff: true,
          service: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(appointmentId: string): Promise<string> {
    try {
      await this.prisma.appointment.delete({
        where: { appointmentId },
      });

      return `Appointment with id ${appointmentId} has been deleted`;
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
