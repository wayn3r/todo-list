import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      allowedHeaders: '*',
    },
  });
  await app.listen(process.env.PORT || 3000);

  const logger = new Logger('NestApplication');
  logger.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
