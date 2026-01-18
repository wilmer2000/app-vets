import { Module } from '@nestjs/common';
import { PetService } from './pet.service.js';
import { PetController } from './pet.controller.js';

@Module({
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
