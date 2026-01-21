import { Module } from '@nestjs/common';
import { PetService } from './pet.service.js';
import { PetController } from './pet.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [PetController],
  providers: [PetService, PrismaService],
})
export class PetModule {}
