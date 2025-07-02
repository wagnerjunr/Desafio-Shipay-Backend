import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BigIntTransformInterceptor } from './common/bigint-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Shipay')
  .setDescription('Project Shipay')
  .setVersion('1.0')
  .addTag('user')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, documentFactory);
  app.useGlobalInterceptors(new BigIntTransformInterceptor());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
