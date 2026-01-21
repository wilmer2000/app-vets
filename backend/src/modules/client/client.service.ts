import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Client } from '../../../prisma/generated/prisma/client.js';
import { Prisma } from '../../../generated/prisma/client.js';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClientDto): Promise<Partial<Client>> {
    const { email, ...clientData } = dto;

    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });

      const clientExists = await this.prisma.client.findFirst({
        where: { userClientId: user.userId },
      });

      if (clientExists) {
        throw new ConflictException(
          'A client profile is already linked to this user email.',
        );
      }

      return await this.prisma.client.create({
        data: { ...clientData, user: { connect: { userId: user.userId } } },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Partial<Client[]>> {
    try {
      return await this.prisma.client.findMany({
        include: {
          pets: true,
          user: {
            select: {
              email: true,
              name: true,
              lastname: true,
            },
          },
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(clientId: string): Promise<Partial<Client>> {
    try {
      return await this.prisma.client.findUniqueOrThrow({
        where: { clientId },
        include: {
          pets: true,
          user: {
            select: {
              email: true,
              name: true,
              lastname: true,
            },
          },
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Client with ID ${clientId} not found`);
      }

      throw new InternalServerErrorException(error);
    }
  }

  async remove(clientId: string): Promise<string> {
    try {
      await this.prisma.client.delete({
        where: { clientId },
      });
      return `Client with id ${clientId} deleted`;
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
