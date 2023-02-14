
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors();

  /**
   * Apply validation for all inputs globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Strip away all none-object existing properties
       */
      whitelist: true,
      /***
       * Transform input objects to their corresponding DTO objects
       */
      transform: true,
    }),
  );


  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
