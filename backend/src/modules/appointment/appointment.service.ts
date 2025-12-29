import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Status } from '../../../prisma/generated/prisma/enums.js';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { OwnerProfileWhereUniqueInput } from '../../../prisma/generated/prisma/models/OwnerProfile.js';
import { VetProfileWhereUniqueInput } from '../../../prisma/generated/prisma/models/VetProfile.js';
import { VeterinaryWhereUniqueInput } from '../../../prisma/generated/prisma/models/Veterinary.js';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    try {
      const service = dto.service;
      const startTime = new Date(dto.startTime);
      const endTime = new Date(dto.endTime);
      const ownerId = { id: dto.ownerId } as OwnerProfileWhereUniqueInput;
      const vetId = { id: dto.vetId } as VetProfileWhereUniqueInput;
      const veterinaryId = {
        id: dto.veterinaryId,
      } as VeterinaryWhereUniqueInput;

      return await this.prisma.appointment.create({
        data: {
          startTime,
          endTime,
          service,
          owner: { connect: ownerId },
          vet: { connect: vetId },
          veterinary: { connect: veterinaryId },
          pets: { connect: dto.pets.map((id: string) => ({ id })) },
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

  async update(id: string, dto: UpdateAppointmentDto) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    const service = dto.service;
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);
    const ownerId = { id: dto.ownerId } as OwnerProfileWhereUniqueInput;
    const vetId = { id: dto.vetId } as VetProfileWhereUniqueInput;
    const veterinaryId = {
      id: dto.veterinaryId,
    } as VeterinaryWhereUniqueInput;

    return this.prisma.appointment.update({
      data: {
        startTime,
        endTime,
        service,
        owner: { connect: ownerId },
        vet: { connect: vetId },
        veterinary: { connect: veterinaryId },
        pets: { connect: dto.pets.map((id: string) => ({ id })) },
        status: Status.PENDING,
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
