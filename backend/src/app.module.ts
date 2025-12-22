import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersModule } from './modules/users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  providers: [PrismaService],
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AppModule {}
