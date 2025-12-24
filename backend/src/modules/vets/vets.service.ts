import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto.js';
import { UpdateVetDto } from './dto/update-vet.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VetsService {
  constructor(private prisma: PrismaService) {}

  async create(createVetDto: CreateVetDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(createVetDto.password, salt);

      return this.prisma.user.create({
        data: {
          ...createVetDto,
          password: hash,
          role: Role.VET,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany({
        where: { role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllByVeterinary(id: string) {
    try {
      return this.prisma.user.findMany({
        where: { id, role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: { id, role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateVetDto: UpdateVetDto) {
    try {
      return this.prisma.user.update({
        where: { id },
        data: { ...updateVetDto, role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.user.delete({
        where: { id, role: Role.VET },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
