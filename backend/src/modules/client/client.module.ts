import { Module } from '@nestjs/common';
import { ClientService } from './client.service.js';
import { ClientController } from './client.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
})
export class ClientModule {}
