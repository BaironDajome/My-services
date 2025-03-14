/* eslint-disable prettier/prettier */
import * as crypto from 'crypto';
(global as any).crypto = crypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Sedimentos')
    .setDescription('Documentación de la API para la gestión de sedimentacion de las principales bahia del pacifico colombiano')
    .setVersion('1.0')
    .addTag('Sedimentacion')
    .build();

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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Servidor corriendo en: http://localhost:${port}/api/v1`);
  console.log(`http://localhost:${port}/api`);
  
}

bootstrap();

