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
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller({ path: '/veterinary/staff' })
@Roles(Role.ADMIN, Role.VET, Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get(':veterinaryId')
  async getStaff(
    @Param('veterinaryId') veterinaryId: string,
    @Query('staffId') staffId: string,
  ) {
    return await this.staffService.getStaff(veterinaryId, staffId);
  }

  @Post(':veterinaryId')
  async setStaff(
    @Param('veterinaryId') veterinaryId: string,
    @Body('staffId') staffId: string,
  ) {
    return await this.staffService.setStaff(veterinaryId, staffId);
  }

  @Delete(':veterinaryId')
  async removeStaff(
    @Param('veterinaryId') veterinaryId: string,
    @Body('staffId') staffId: string,
  ) {
    return await this.staffService.removeStaff(veterinaryId, staffId);
  }

  @Get(':veterinaryId/list')
  async getStaffList(@Param('veterinaryId') veterinaryId: string) {
    return await this.staffService.getStaffList(veterinaryId);
  }
}
