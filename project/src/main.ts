import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 스키마에서 class-validation 사용을 위한 등록
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  const PORT = process.env.PORT;

  // http://localhost:8000/media/cats/aaa.png
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  // Swagger 옵션
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true, // true로 설정하면 어떤 프론트엔드 사이트라도 다 접근할 수 있으므로 개발 단계에서만 true로 설정 권장
    // origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(PORT);
}
bootstrap();

/*
1. main에서 bootstrap()으로 app 실행
2. app은 AppModule로 만들어짐 -> app.module
3. AppModule에 Controller(AppController) 존재 -> app.controller
4. Controller에 Get이 왔을 때 getHello()를 실행하는 메소드 존재
5. getHello()의 리턴값은 appService.getHello() -> app.service
6. appService(AppService)에서 'Hello World!' 리턴
*/
