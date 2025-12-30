import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { LocalStrategy } from './strategies/local.strategy.js';
import { PassportModule } from '@nestjs/passport';
import { EmailService } from '../services/email.service.js';
import { UserService } from '../user/user.service.js';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    EmailService,
    UserService,
  ],
})
export class AuthModule {}
