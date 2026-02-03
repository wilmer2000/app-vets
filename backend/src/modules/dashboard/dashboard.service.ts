import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Dashboard } from './dashboard.interface.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getAdminDashboard(): Promise<Dashboard> {
    try {
      const userCount = await this.prisma.user.count();
      const entityCount = await this.prisma.entity.count();

      return {
        userCount,
        entityCount,
      };
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
