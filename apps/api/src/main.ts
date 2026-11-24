import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://student-verse-two.vercel.app',
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser requests (curl, server-to-server, mobile)
      if (!origin) return callback(null, true);
      // Validate origin against allowed origins and development / vercel hosts
      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, origin); // Mirror requesting origin to satisfy W3C CORS credentials specification
      }
      return callback(null, origin);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With,Origin',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('StudentVerse API')
    .setDescription(
      'StudentVerse - Global Digital Skills Learning & Talent Hiring Platform OpenAPI 3.0 REST Specification'
    )
    .setVersion('1.0')
    .addTag('Identity & Authentication')
    .addTag('Courses')
    .addTag('Recruitment & Jobs')
    .addTag('Credentials & Verifications')
    .addTag('Talent Profiles (Privacy-First)')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`StudentVerse API is listening on http://localhost:${port}/api/v1`);
  console.log(`Interactive API Documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();
