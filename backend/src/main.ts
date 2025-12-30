import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { HttpExceptionFilter } from './core/filters/http-exception.filter.js';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  app.set('query parser', 'extended');

  await app.listen(process.env.PORT ?? 3000);
  console.log('Server running on port ' + process.env.PORT);
}

await bootstrap().then();
