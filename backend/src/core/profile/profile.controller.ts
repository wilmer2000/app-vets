import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { Roles } from '../auth/decorators/role.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Role } from '@prisma/client';

@Controller({ path: 'profile' })
@Roles(Role.ADMIN, Role.VET, Role.OWNER, Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(':id')
  upsert(@Param('id') id: string, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.upsert(id, createProfileDto);
  }
}
