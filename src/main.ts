import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtGuard } from './common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,        //transform returned payload to the correct instance from their own respective dto
      transformOptions:
      {
        enableImplicitConversion: true,   //query parameter changed automatically their own respective type
      },
    }
  ));
  await app.listen(3000);
}
bootstrap();
