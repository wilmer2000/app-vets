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
import { StaffModule } from './modules/staff/staff.module.js';
import { EntityModule } from './modules/entity/entity.module.js';
import { AppointmentModule } from './modules/appointment/appointment.module.js';
import { ServiceModule } from './modules/service/service.module.js';
import { ConfigurationModule } from './modules/configuration/configuration.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';

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
    StaffModule,
    EntityModule,
    AppointmentModule,
    ServiceModule,
    ConfigurationModule,
    DashboardModule,
  ],
})
export class AppModule {}
