import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersModule } from './modules/users/users.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [PrismaService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AppModule {}
