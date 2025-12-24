import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto.js';
import { UpdateVetDto } from './dto/update-vet.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';

@Injectable()
export class VetsService {
  constructor(private prisma: PrismaService) {}

  create(createVetDto: CreateVetDto) {
    try {
      return this.prisma.user.create({
        data: {
          email: createVetDto.email,
          password: createVetDto.password,
          name: createVetDto.name,
          lastname: createVetDto.lastname,
          specialty: createVetDto.specialty,
          role: Role.VET,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      return this.prisma.user.findMany({
        where: { role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAllByVeterinary(id: string) {
    try {
      return this.prisma.user.findMany({
        where: { id, role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: { id, role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: string, updateVetDto: UpdateVetDto) {
    try {
      return this.prisma.user.update({
        where: { id },
        data: { ...updateVetDto, role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.user.delete({
        where: { id, role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
