import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // public에 js, css 파일 등의 정적 파일을 serve
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // 템플릿 엔진 저장위치 설정 - views에 있는 파일을 view로 사용
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs'); // ViewEngine으로 hbs 사용

  // __dirname: 현재 디렉토리(src)
  // join(__dirname, '..', 'public'): src -> 상위폴더(chattings) -> public 폴더

  await app.listen(8000);
}
bootstrap();
