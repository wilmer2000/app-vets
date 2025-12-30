import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module.js';
import { VetsModule } from './modules/vets/vets.module.js';
import { PetsModule } from './modules/pets/pets.module.js';
import { OwnersModule } from './modules/owners/owners.module.js';
import { jwtConstants } from './core/auth/constants/auth.constants.js';
import { AppointmentModule } from './modules/appointment/appointment.module.js';
import { VeterinaryModule } from './modules/veterinary/veterinary.module.js';
import { ConfigurationModule } from './modules/configuration/configuration.module.js';
import { ServiceModule } from './modules/service/service.module.js';
import { PaymentModule } from './modules/payment/payment.module.js';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/filters/http-exception.filter.js';

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
    VetsModule,
    PetsModule,
    OwnersModule,
    AppointmentModule,
    VeterinaryModule,
    ConfigurationModule,
    ServiceModule,
    PaymentModule,
  ],
})
export class AppModule {}
