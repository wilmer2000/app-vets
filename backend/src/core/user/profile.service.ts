import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { User } from '../../../prisma/generated/prisma/client.js';
import { UpdateOwnerUserDto } from './dtos/update-owner-user.dto.js';
import { UpdateVetUserDto } from './dtos/update-vet-user.dto.js';
import { CreateOwnerUserDto } from './dtos/create-owner-user.dto.js';
import { UserService } from './user.service.js';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private usersService: UserService,
  ) {}

  async setOwnerProfile(
    id: string,
    dto: CreateOwnerUserDto,
  ): Promise<Partial<User>> {
    try {
      const user = await this.usersService.findOne(id);
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
      const user = await this.usersService.findOne(id);
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
      const vet = await this.usersService.findOne(id);
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
      const vet = await this.usersService.findOne(id);
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
