import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //swagger
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Posts API')
    .setDescription('A REST API for managing users and posts')
    .setVersion('1.0')
    .addBearerAuth(
      // 👈 adds the JWT Authorization button in Swagger UI
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // 👈 this name will be referenced in our controllers
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // 👈 docs live at /api/docs

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
