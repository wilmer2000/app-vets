import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Role, User } from '../../../prisma/generated/prisma/client.js';
import { UpdateOwnerUserDto } from './dtos/update-owner-user.dto.js';
import { UpdateVetUserDto } from './dtos/update-vet-user.dto.js';
import { CreateOwnerUserDto } from './dtos/create-owner-user.dto.js';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async setOwnerProfile(
    id: string,
    dto: CreateOwnerUserDto,
  ): Promise<Partial<User>> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id, role: Role.OWNER },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.prisma.ownerProfile.create({
        data: {
          pets: { connect: dto.pets.map((id: string) => ({ id })) },
          user: { connect: { id: user.id } },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOwnerProfile(
    id: string,
    dto: UpdateOwnerUserDto,
  ): Promise<Partial<User>> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id, role: Role.OWNER },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const ownerProfile = await this.prisma.ownerProfile.findUnique({
        where: { userId: id },
      });
      if (!ownerProfile) {
        return await this.setOwnerProfile(id, dto as CreateOwnerUserDto);
      }

      const pets = dto.pets ?? [];
      return await this.prisma.ownerProfile.update({
        data: {
          pets: { connect: pets.map((id: string) => ({ id })) },
        },
        where: { userId: id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async setVetProfile(
    id: string,
    dto: UpdateVetUserDto,
  ): Promise<Partial<User>> {
    try {
      const vet = await this.prisma.user.findUnique({
        where: { id, role: Role.VET },
      });
      if (!vet) {
        throw new NotFoundException('Vet not found');
      }

      return await this.prisma.vetProfile.create({
        data: {
          specialty: dto.specialty,
          user: { connect: { id: vet.id } },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateVetProfile(
    id: string,
    dto: UpdateVetUserDto,
  ): Promise<Partial<User>> {
    try {
      const vet = await this.prisma.user.findUnique({
        where: { id, role: Role.VET },
      });
      if (!vet) {
        throw new NotFoundException('Vet not found');
      }

      return await this.prisma.vetProfile.create({
        data: {
          specialty: dto.specialty,
          user: { connect: { id: vet.id } },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
