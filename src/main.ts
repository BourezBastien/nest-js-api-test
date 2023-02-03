import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AccountModule } from './account/account.module';
import { AppModule } from './app.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('NestJS Exemple')
    .setDescription('Test Api for nestJS.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [TransactionsModule, AccountModule, UserModule]
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
