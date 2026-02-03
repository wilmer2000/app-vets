import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/role.decorator.js';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../core/auth/guards/roles.guard.js';
import { Role } from '../../../prisma/generated/prisma/client.js';
import { Dashboard } from './dashboard.interface.js';

@ApiBearerAuth()
@Controller({ path: 'dashboard' })
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('admin')
  async getAdminDashboard(): Promise<Dashboard> {
    return await this.dashboardService.getAdminDashboard();
  }
}
