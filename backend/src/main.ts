// 핵심 기능 nestFactory를 사용해서 Nest App instance를 생성하는 Entry File

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend connection
  app.enableCors({
    origin: 'http://localhost:5173', // Vue.js dev server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Backend server is running on http://localhost:3000');
}
bootstrap();
