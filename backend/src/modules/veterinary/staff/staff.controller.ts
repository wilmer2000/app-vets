import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { StaffService } from './staff.service.js';
import { Roles } from '../../../core/auth/decorators/role.decorator.js';
import { JwtAuthGuard } from '../../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../../core/auth/guards/roles.guard.js';

@Controller({ path: '/veterinary/staff' })
@Roles(Role.ADMIN, Role.VET, Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get(':veterinaryId')
  async getStaff(
    @Param('veterinaryId') veterinaryId: string,
    @Query('userId') userId: string,
  ) {
    return await this.staffService.getStaff(veterinaryId, userId);
  }

  @Post(':veterinaryId')
  async setStaff(
    @Param('veterinaryId') veterinaryId: string,
    @Body('userId') userId: string,
  ) {
    return await this.staffService.setStaff(veterinaryId, userId);
  }

  @Delete(':veterinaryId')
  async removeStaff(
    @Param('veterinaryId') veterinaryId: string,
    @Query('userId') userId: string,
  ) {
    return await this.staffService.removeStaff(veterinaryId, userId);
  }

  @Get(':veterinaryId/list')
  async getStaffList(@Param('veterinaryId') veterinaryId: string) {
    return await this.staffService.getStaffList(veterinaryId);
  }
}
