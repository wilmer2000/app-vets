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
      await this.validateVeterinary(veterinaryId);
      await this.validateStaff(staffId);

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
      await this.validateVeterinary(veterinaryId);
      return await this.validateStaff(staffId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeStaff(veterinaryId: string, staffId: string) {
    try {
      await this.validateVeterinary(veterinaryId);
      await this.validateStaff(staffId);

      await this.prisma.veterinary.update({
        where: { id: veterinaryId },
        data: {
          staff: {
            disconnect: [{ userId: staffId }],
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getStaffList(veterinaryId: string) {
    try {
      await this.validateVeterinary(veterinaryId);

      return await this.prisma.veterinary.findMany({
        where: { id: veterinaryId },
        select: {
          id: true,
          staff: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async validateVeterinary(veterinaryId: string) {
    const vet = await this.prisma.veterinary.findUnique({
      where: { id: veterinaryId },
    });
    if (!vet)
      throw new NotFoundException(
        `Veterinary with ID ${veterinaryId} not found`,
      );
    return vet;
  }

  private async validateStaff(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        role: Role.VET,
      },
      omit: { password: true },
    });
    if (!user)
      throw new NotFoundException(`Staff user with ID ${id} not found`);
    return user;
  }
}
