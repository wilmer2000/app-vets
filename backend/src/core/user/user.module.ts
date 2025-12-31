import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { JwtStrategy } from '../auth/strategies/jwt.strategy.js';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
})
export class UserModule {}
