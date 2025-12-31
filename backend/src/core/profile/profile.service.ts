import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Prisma } from '../../../prisma/generated/prisma/client.js';
import { Role } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async upsert(id: string, dto: CreateProfileDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      if (user.role === Role.OWNER) {
        const connectPets = dto.pets?.length
          ? dto.pets.map((id: string) => ({ id }))
          : Prisma.skip;

        return await this.prisma.ownerProfile.upsert({
          where: { userId: user.id },
          update: {
            pets: connectPets ? { connect: connectPets } : Prisma.skip,
          },
          create: {
            userId: user.id,
            pets: connectPets ? { connect: connectPets } : Prisma.skip,
          },
        });
      }

      if (user.role === Role.VET) {
        const connectSpeciality = dto.specialty ?? Prisma.skip;

        return await this.prisma.vetProfile.upsert({
          where: { userId: user.id },
          update: {
            specialty: connectSpeciality,
          },
          create: {
            userId: user.id,
            specialty: connectSpeciality,
          },
        });
      }

      throw new ForbiddenException('Profile creation failed');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
