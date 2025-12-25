import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from './middleware/cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors(corsConfig);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log('Application is running on: http://localhost:3001');
}
bootstrap();