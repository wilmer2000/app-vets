import { Module } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service.js';
import { VeterinaryController } from './veterinary.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { StaffModule } from './staff/staff.module.js';

@Module({
  imports: [StaffModule],
  controllers: [VeterinaryController],
  providers: [VeterinaryService, PrismaService],
})
export class VeterinaryModule {}
