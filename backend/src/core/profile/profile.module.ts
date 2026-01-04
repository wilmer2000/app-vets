import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileController } from './profile.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { UserService } from '../user/user.service.js';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService, UserService],
})
export class ProfileModule {}
