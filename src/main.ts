/* eslint-disable prettier/prettier */
import * as crypto from 'crypto';
(global as any).crypto = crypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Habilitar CORS
  app.setGlobalPrefix('api/v1'); // Prefijo global para rutas API

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Rechaza solicitudes con propiedades no permitidas
      transform: true, // Convierte tipos automáticamente según los DTOs
    })
  );

  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>('PORT', '3000'), 10);

  await app.listen(port);
  console.log(`Servidor corriendo en: http://localhost:${port}/api/v1`);
}

bootstrap();

