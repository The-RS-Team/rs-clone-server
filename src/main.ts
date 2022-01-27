import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
        cors: true,
    });
    const config = new DocumentBuilder()
        .setTitle('TrelloClone API')
        .setDescription('TrelloClone API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    app.setGlobalPrefix('');
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
