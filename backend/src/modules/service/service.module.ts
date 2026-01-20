import { Module } from '@nestjs/common';
import { ServiceService } from './service.service.js';
import { ServiceController } from './service.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, PrismaService],
})
export class ServiceModule {}
