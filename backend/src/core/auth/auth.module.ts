import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { LocalStrategy } from './strategies/local.strategy.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy],
})
export class AuthModule {}
