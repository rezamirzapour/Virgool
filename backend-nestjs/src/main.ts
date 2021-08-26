/* eslint-disable prettier/prettier */
declare const module: any;
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'common/filter'

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: { credentials: true, origin: process.env.ALLOWED_ORIGIN.split(",") } });

  const config = new DocumentBuilder()
    .setTitle('Virgool')
    .setDescription('The Virgool API Documentation - Backend Server Powered By Nestjs')
    .setVersion('1.0')
    .addBearerAuth(/*{ description: 'Warning! dont put "Bearer" keyword before your access token', type: 'apiKey' }*/)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(cookieParser())

  await app.listen(8000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
