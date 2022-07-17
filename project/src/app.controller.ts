import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

// @: Decorator - 함수나 클래스에 기능을 첨가 -> 재사용성을 극대화
@Controller() // () 안에 'endpoint' 작성 가능
export class AppController {
  // appService 사용을 위한 의존성 주입 (dependency injection)
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService, // 캡슐화된 provider -> Module에서 export
  ) {}

  // getHello라는 함수에 Get() 기능을 첨가한다
  @Get()
  // nestjs에서는 body를 인자에서 받을 수 있다
  getHello(
    @Req() req: Request,
    @Body() Body, // Body는 DTO(Body에 대한 속성 정의) 안에 작성하여 body에 대한 validation 평가
    @Param() param: { id: string; name: string },
  ): string {
    /* appService에서 값을 리턴하면 controller에서 리턴값을 받고 module로 들어가서,
    이 Module이 (main에서 불러오는) NestFactory에 들어가서 자동으로 client가 해당 라우터에 들어가서 받을 수 있도록 설정
    */
    //console.log(param);
    return this.appService.getHello();
    // return this.appService.getHello(Body, param);
  }

  @Get('hello/:id/:name') // 'endpoint' 작성 + 동적 라우팅
  getCatHello() {
    // return this.catsService.hiCatServiceProduct();
  }
}

// npm run start:dev
