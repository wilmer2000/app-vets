import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service.js';
import { OwnersController } from './owners.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService, PrismaService],
})
export class OwnersModule {}
