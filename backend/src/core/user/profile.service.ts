import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import {
  OwnerProfile,
  VetProfile,
} from '../../../prisma/generated/prisma/client.js';
import { UpdateOwnerUserDto } from './dtos/update-owner-user.dto.js';
import { UpdateVetUserDto } from './dtos/update-vet-user.dto.js';
import { CreateOwnerUserDto } from './dtos/create-owner-user.dto.js';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getOwnerProfile(id: string): Promise<OwnerProfile> {
    try {
      const owner = await this.prisma.ownerProfile.findUnique({
        where: { userId: id },
        include: {
          pets: true,
          appointments: true,
        },
      });

      if (!owner) {
        throw new NotFoundException('Owner not found');
      }

      return owner;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async setOwnerProfile(
    id: string,
    dto: CreateOwnerUserDto,
  ): Promise<OwnerProfile> {
    try {
      return await this.prisma.ownerProfile.create({
        data: {
          pets: { connect: dto.pets.map((id: string) => ({ id })) },
          user: { connect: { id } },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOwnerProfile(
    id: string,
    dto: UpdateOwnerUserDto,
  ): Promise<OwnerProfile> {
    try {
      const user = await this.getOwnerProfile(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const pets = dto.pets ?? [];
      return await this.prisma.ownerProfile.update({
        data: {
          pets: {
            set: pets.map((id: string) => ({ id })),
          },
        },
        where: { userId: id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Vet methods

  async getVetProfile(id: string): Promise<VetProfile> {
    try {
      const vet = await this.prisma.vetProfile.findUnique({
        where: { userId: id },
      });
      if (!vet) {
        throw new NotFoundException('Vet not found');
      }
      return vet;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async setVetProfile(id: string, dto: UpdateVetUserDto): Promise<VetProfile> {
    try {
      const vet = await this.getVetProfile(id);
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
  ): Promise<VetProfile> {
    try {
      const vet = await this.getVetProfile(id);
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
