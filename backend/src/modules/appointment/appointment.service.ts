import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Status } from '../../../prisma/generated/prisma/enums.js';
import { VetsService } from '../vets/vets.service.js';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private vetsService: VetsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const startTime = new Date(createAppointmentDto.startTime);
      const endTime = new Date(createAppointmentDto.endTime);

      if (startTime > endTime) {
        throw new InternalServerErrorException(
          'Start time must be before end time',
        );
      }

      const vet = this.vetsService.findOne(createAppointmentDto.vetId);

      return await this.prisma.appointment.create({
        data: {
          ...createAppointmentDto,
          startTime,
          endTime,
          status: Status.PENDING,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.appointment.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const appointment = await this.prisma.appointment.findUnique({
        where: { id },
      });

      if (!appointment) {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }

      return appointment;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    const startTime = new Date(updateAppointmentDto.startTime);
    const endTime = new Date(updateAppointmentDto.endTime);

    return this.prisma.appointment.update({
      data: {
        ...updateAppointmentDto,
        startTime,
        endTime,
      },
      where: { id },
    });
  }

  async remove(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
