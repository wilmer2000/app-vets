import { Module } from '@nestjs/common';
import { EntityService } from './entity.service.js';
import { EntityController } from './entity.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [EntityController],
  providers: [EntityService, PrismaService],
})
export class EntityModule {}
