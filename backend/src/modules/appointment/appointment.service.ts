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
import { Prisma } from '../../../prisma/generated/prisma/client.js';
import { Role } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    try {
      const service = dto.service;
      const startTime = new Date(dto.startTime);
      const endTime = new Date(dto.endTime);
      const ownerId = { userId: dto.ownerId } as OwnerProfileWhereUniqueInput;
      const vetId = { userId: dto.vetId } as VetProfileWhereUniqueInput;
      const veterinaryId = {
        id: dto.veterinaryId,
      } as VeterinaryWhereUniqueInput;

      if (startTime >= endTime) {
        throw new InternalServerErrorException(
          'Start time must be before end time',
        );
      }
      if (startTime < new Date()) {
        throw new InternalServerErrorException(
          'Start time must be in the future',
        );
      }

      const owner = await this.prisma.user.findFirst({
        where: { id: dto.ownerId, role: Role.OWNER },
        include: { ownerProfile: { include: { pets: true } } },
      });
      if (!owner) {
        throw new NotFoundException('Owner does not exist');
      }

      const hasPets = owner.ownerProfile?.pets;
      if (hasPets) {
        throw new InternalServerErrorException('Owner does not have pets');
      }
      const petsExist = owner.ownerProfile?.pets.filter(
        (pet) => pet.id !== dto.pets[0],
      );

      if (!petsExist) {
        throw new InternalServerErrorException('Owner does not own all pets');
      }

      const pets = dto.pets
        ? dto.pets.map((petId: string) => ({ id: petId }))
        : Prisma.skip;

      return await this.prisma.appointment.create({
        data: {
          startTime,
          endTime,
          service,
          owner: { connect: ownerId },
          vet: { connect: vetId },
          veterinary: { connect: veterinaryId },
          pets: { connect: pets },
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
    const vetId = { id: dto.vetId } as VetProfileWhereUniqueInput;

    if (startTime >= endTime) {
      throw new InternalServerErrorException(
        'Start time must be before end time',
      );
    }
    if (startTime < new Date()) {
      throw new InternalServerErrorException(
        'Start time must be in the future',
      );
    }

    // TODO: Validate pets list with the orwner pets

    const pets = dto.pets
      ? dto.pets.map((petId: string) => ({ id: petId }))
      : Prisma.skip;

    return await this.prisma.appointment.update({
      data: {
        startTime,
        endTime,
        service,
        vet: { connect: vetId },
        pets: { connect: pets },
        status: dto.status,
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

    return await this.prisma.appointment.delete({
      where: { id },
    });
  }
}
