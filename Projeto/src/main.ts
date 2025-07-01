import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntTransformInterceptor } from './common/bigint-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new BigIntTransformInterceptor());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
