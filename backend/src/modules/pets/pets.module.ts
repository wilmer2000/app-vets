import { Module } from '@nestjs/common';
import { PetsService } from './pets.service.js';
import { PetsController } from './pets.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [PetsController],
  providers: [PetsService, PrismaService],
})
export class PetsModule {}
