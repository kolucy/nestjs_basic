import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
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