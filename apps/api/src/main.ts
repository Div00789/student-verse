import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
      'StudentVerse - Global Digital Skills Learning & Talent Hiring Platform (RankGood Tech) OpenAPI 3.0 REST Specification'
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
