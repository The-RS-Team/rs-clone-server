import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
    cors: true,
  });
  const config = new DocumentBuilder()
    .setTitle('TrelloClone API')
    .setDescription('TrelloClone API')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.setGlobalPrefix('');
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({
    limit: '10mb',
    parameterLimit: 100000,
    extended: true,
  }));
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
