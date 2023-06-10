import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))

  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap().then(()=>{
  console.log(`server is running on port ${process.env.APP_PORT || 3000}`);
})
