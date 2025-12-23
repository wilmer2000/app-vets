import { Module } from '@nestjs/common';
import { VetsService } from './vets.service.js';
import { VetsController } from './vets.controller.js';

@Module({
  controllers: [VetsController],
  providers: [VetsService],
})
export class VetsModule {}
