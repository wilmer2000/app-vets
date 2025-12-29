import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Status } from '../../../prisma/generated/prisma/enums.js';
import { VetsService } from '../vets/vets.service.js';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { UsersService } from '../../core/users/users.service.js';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private vetsService: VetsService,
    private userService: UsersService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const participants =  await  this.userService.getUsersById(createAppointmentDto.participants);
      return await this.prisma.appointment.create({
        data: {
          ...createAppointmentDto,
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
