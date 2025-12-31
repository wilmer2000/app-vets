import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service.js';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async setStaff(veterinaryId: string, userId: string) {
    try {
      const veterinary = await this.prisma.veterinary.findUnique({
        where: { id: veterinaryId },
      });
      if (!veterinary) {
        throw new NotFoundException(
          `Veterinary with ID ${veterinaryId} not found`,
        );
      }

      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      await this.prisma.veterinary.update({
        where: { id: veterinaryId },
        data: {
          staff: {
            connectOrCreate: [{ where: { userId }, create: { userId } }],
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getStaff(veterinaryId: string, userId: string) {
    try {
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
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
