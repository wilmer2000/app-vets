import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service.js';
import { Role } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async setStaff(veterinaryId: string, staffId: string) {
    try {
      const veterinary = await this.prisma.veterinary.findUnique({
        where: { id: veterinaryId },
      });
      if (!veterinary) {
        throw new NotFoundException(
          `Veterinary with ID ${veterinaryId} not found`,
        );
      }

      const user = await this.prisma.user.findUnique({
        where: { id: staffId, role: Role.VET },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${staffId} not found`);
      }

      await this.prisma.veterinary.update({
        where: { id: veterinaryId },
        data: {
          staff: {
            connectOrCreate: [
              { where: { userId: staffId }, create: { userId: staffId } },
            ],
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getStaff(veterinaryId: string, staffId: string) {
    try {
      const veterinary = await this.prisma.veterinary.findUnique({
        where: { id: veterinaryId },
      });
      if (!veterinary) {
        throw new NotFoundException(
          `Veterinary with ID ${veterinaryId} not found`,
        );
      }

      const staff = await this.prisma.user.findUnique({
        where: { id: staffId, role: Role.VET },
        omit: { password: true },
      });
      if (!staff) {
        throw new NotFoundException(`User with ID ${staffId} not found`);
      }

      return staff;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeStaff(veterinaryId: string, userId: string) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getStaffList(veterinaryId: string) {
    try {
      const veterinary = await this.prisma.veterinary.findUnique({
        where: { id: veterinaryId },
      });
      if (!veterinary) {
        throw new NotFoundException(
          `Veterinary with ID ${veterinaryId} not found`,
        );
      }

      return await this.prisma.veterinary.findMany({
        where: { id: veterinary.id },
        select: {
          id: true,
          staff: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
