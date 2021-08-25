import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('pooort: ', process.env.PORT);

  var PORT = process.env.PORT;
  var ADDR = '0.0.0.0';

  await app.listen(process.env.PORT, ADDR);
}
bootstrap();
