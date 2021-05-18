import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
  console.log(`Server listening on port ${port}`)

}
bootstrap();
