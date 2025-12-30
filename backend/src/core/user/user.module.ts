import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { JwtStrategy } from '../auth/strategies/jwt.strategy.js';
import { ProfileService } from './profile.service.js';

@Module({
  controllers: [UserController],
  providers: [UserService, ProfileService, PrismaService, JwtStrategy],
})
export class UserModule {}
