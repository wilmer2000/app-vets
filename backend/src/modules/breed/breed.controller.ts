import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedService } from './breed.service.js';
import { CreateBreedDto } from './dto/create-breed.dto.js';
import { UpdateBreedDto } from './dto/update-breed.dto.js';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { Role } from '../../../prisma/generated/prisma/enums.js';

@Controller({ path: 'breed' })
@Roles(Role.ADMIN, Role.USER, Role.VET)
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedService.create(createBreedDto);
  }

  @Get()
  findAll() {
    return this.breedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedService.update(id, updateBreedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedService.remove(id);
  }
}
