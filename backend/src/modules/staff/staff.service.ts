import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto.js';
import { UpdateStaffDto } from './dto/update-staff.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Prisma } from '../../../generated/prisma/client.js';
import { Staff } from '../../../prisma/generated/prisma/client.js';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStaffDto): Promise<Partial<Staff>> {
    const { email, ...staffData } = dto;
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
      const staffExists = await this.prisma.staff.findFirst({
        where: { userStaffId: user.userId },
      });

      if (staffExists) {
        throw new ConflictException(
          'A staff profile is already linked to this user email.',
        );
      }

      return await this.prisma.staff.create({
        data: { ...staffData, user: { connect: { userId: user.userId } } },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Partial<Staff[]>> {
    try {
      return await this.prisma.staff.findMany({
        include: {
          user: {
            select: {
              email: true,
              name: true,
              lastname: true,
            },
          },
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(staffId: string): Promise<Partial<Staff>> {
    try {
      return await this.prisma.staff.findUniqueOrThrow({
        where: { staffId },
        include: {
          user: {
            select: {
              email: true,
              name: true,
              lastname: true,
            },
          },
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Staff with ID ${staffId} not found`);
      }

      throw new InternalServerErrorException(error);
    }
  }

  async update(staffId: string, dto: UpdateStaffDto): Promise<Partial<Staff>> {
    try {
      return await this.prisma.staff.update({
        where: { staffId },
        data: { ...dto },
        include: {
          user: {
            select: {
              email: true,
              name: true,
              lastname: true,
            },
          },
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(staffId: string): Promise<string> {
    try {
      await this.prisma.staff.delete({
        where: { staffId },
      });
      return `Staff with id ${staffId} deleted`;
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
