import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...'); // pre-controller

    // const now = Date.now();
    /* data는 response에 대한 인자를 받는다
    controller가 먼저 실행되기 때문에 controller에서 리턴한 값을 data로 받는다
    */
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
    //.pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    // post-request
  }
  // AOP 시각으로 모듈화
}
