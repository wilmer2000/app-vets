import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module.js';
import { VetsModule } from './modules/vets/vets.module.js';
import { PetsModule } from './modules/pets/pets.module.js';
import { OwnersModule } from './modules/owners/owners.module.js';
import { jwtConstants } from './core/auth/constants/auth.constants.js';

@Module({
  providers: [PrismaService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    CoreModule,
    VetsModule,
    PetsModule,
    OwnersModule,
  ],
})
export class AppModule {}
