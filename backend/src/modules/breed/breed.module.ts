import { Module } from '@nestjs/common';
import { BreedService } from './breed.service.js';
import { BreedController } from './breed.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [BreedController],
  providers: [BreedService, PrismaService],
})
export class BreedModule {}
