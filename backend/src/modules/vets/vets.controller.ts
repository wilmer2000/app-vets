import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VetsService } from './vets.service.js';
import { CreateVetDto } from './dto/create-vet.dto.js';
import { UpdateVetDto } from './dto/update-vet.dto.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';

@Controller({ path: 'vets', version: '1' })
@UseGuards(JwtAuthGuard)
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}

  @Post()
  create(@Body() createVetDto: CreateVetDto) {
    return this.vetsService.create(createVetDto);
  }

  @Get()
  findAll() {
    return this.vetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVetDto: UpdateVetDto) {
    return this.vetsService.update(id, updateVetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vetsService.remove(id);
  }
}
