import { NestApplication, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import expressBasicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception-filter';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  app.use(
    ['/docs'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );
  // !! http://localhost:8000/media/cats/파일이름.확장자
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // !! swagger api end-point, 자동으로 controller를 읽어서 API 문서화 시킴
  // ? 프론트엔드, 백엔드 모두 똑같이 설정

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
