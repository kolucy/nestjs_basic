import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // MongoDB에서 인덱싱을 하겠다
      useFindAndModify: false,
    }),
    CatsModule,
  ],
  // CatsModule에서 export한 서비스들을 AppModule(AppController, Appservice)에서 사용
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // .forRoutes('cats') => cats 라우터에 바인딩
    // .forRoutes('*') => wildcard, 전체 endpoint에 대해서 LoggerMiddleware가 실행
    mongoose.set('debug', this.isDev);
    // mongoose 쿼리를 찍는다 (production 배포시 false)
  }
}
