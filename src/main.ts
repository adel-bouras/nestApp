import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { zodPipe } from './globalPipes/Zod.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT') ?? 8000;
  app.use(cookieParser());
  // app.useGlobalPipes(new zodPipe());
  // const swagger = new DocumentBuilder()
  //   .setTitle('Project documentation')
  //   .setDescription('our 2CS Project documentation')
  //   .setVersion('1.0')
  //   .addTag('DOCS')
  //   .build();
  // const documentFactory = () => SwaggerModule.createDocument(app, swagger);
  // SwaggerModule.setup('documentation', app, documentFactory);

  await app.listen(PORT);
  console.log(`URL : ${await app.getUrl()}`);
}
bootstrap();
