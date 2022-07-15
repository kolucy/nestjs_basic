import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [CatsModule],
  // CatsModule에서 export한 서비스들을 AppModule(AppController, Appservice)에서 사용
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // .forRoutes('cats') => cats 라우터에 바인딩
    // .forRoutes('*') => wildcard, 전체 endpoint에 대해서 LoggerMiddleware가 실행
  }
}
