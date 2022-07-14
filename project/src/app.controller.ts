import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @: Decorator - 함수나 클래스에 기능을 첨가 -> 재사용성을 극대화
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // getHello라는 함수에 Get() 기능을 첨가한다
  @Get()
  getHello(): string {
    /* appService에서 값을 리턴하면 controller에서 리턴값을 받고 module로 들어가서,
    이 Module이 (main에서 불러오는) NestFactory에 들어가서 자동으로 client가 해당 라우터에 들어가서 받을 수 있도록 설정
    */
    return this.appService.getHello();
  }
}

// npm run start:dev