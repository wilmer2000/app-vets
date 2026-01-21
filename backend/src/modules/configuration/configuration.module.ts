import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service.js';
import { ConfigurationController } from './configuration.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Module({
  controllers: [ConfigurationController],
  providers: [ConfigurationService, PrismaService],
})
export class ConfigurationModule {}
