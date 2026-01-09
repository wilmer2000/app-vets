import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Prisma } from '../../../prisma/generated/prisma/client.js';
import { Role } from '@prisma/client';
import { UserService } from '../user/user.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getProfile(userId: string) {
    try {
      return await this.userService.findOne(userId,);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async upsert(id: string, dto: UpdateProfileDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const { address, pets, specialty, ...userData } = dto;

      return await this.prisma.user.update({
        where: { id },
        data: {
          ...userData,
          ...(address && {
            address: {
              upsert: {
                create: {
                  street: dto.address?.street ?? Prisma.skip,
                  city: dto.address?.city ?? Prisma.skip,
                },
                update: {
                  street: dto.address?.street ?? Prisma.skip,
                  city: dto.address?.city ?? Prisma.skip,
                },
              },
            },
          }),
          ...(user.role === Role.OWNER && {
            ownerProfile: {
              update: {
                pets: pets?.length
                  ? { set: pets.map((id) => ({ id })) }
                  : Prisma.skip,
              },
            },
          }),
          ...(user.role === Role.VET && {
            vetProfile: {
              update: { specialty },
            },
          }),
        },
        include: {
          address: true,
          ownerProfile: {
            include: {
              pets: true,
            },
          },
          vetProfile: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
