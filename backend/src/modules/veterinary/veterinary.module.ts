import { Module } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service.js';
import { VeterinaryController } from './veterinary.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [VeterinaryController],
  providers: [VeterinaryService, PrismaService],
})
export class VeterinaryModule {}
