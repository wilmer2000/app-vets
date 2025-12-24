import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto.js';
import { UpdateVetDto } from './dto/update-vet.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class VetsService {
  constructor(private prisma: PrismaService) {}

  create(createVetDto: CreateVetDto) {
    try {
      return this.prisma.vet.create({
        data: {
          email: createVetDto.email,
          password: createVetDto.password,
          name: createVetDto.name,
          lastname: createVetDto.lastname,
          specialty: createVetDto.specialty,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      return this.prisma.vet.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAllByVeterinary(veterinaryId: string) {
    try {
      return this.prisma.vet.findMany({
        where: { veterinaryId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.vet.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: string, updateVetDto: UpdateVetDto) {
    try {
      return this.prisma.vet.update({
        where: { id },
        data: updateVetDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.vet.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
