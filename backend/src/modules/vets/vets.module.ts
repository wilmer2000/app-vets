import { Module } from '@nestjs/common';
import { VetsService } from './vets.service.js';
import { VetsController } from './vets.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [VetsController],
  providers: [VetsService, PrismaService],
})
export class VetsModule {}
