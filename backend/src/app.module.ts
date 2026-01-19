import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module.js';
import { jwtConstants } from './core/auth/constants/auth.constants.js';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/filters/http-exception.filter.js';
import { PetModule } from './modules/pet/pet.module.js';
import { ClientModule } from './modules/client/client.module.js';

@Module({
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
    CoreModule,
    PetModule,
    ClientModule,
  ],
})
export class AppModule {}
