import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    if (typeof error === 'string') {
      response.status(status).json({
        // statusCode: status,
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      // nest 자체에서 발생시키는 에러(404 등)
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}

/*
ctx
: context - 실행환경에 대해서 response, request를 가져온다

response.status(status).json
: 기존 node 방식의 res.status().send()에서 send를 json으로 한정짓는다

nest에서 발생시키는 에러는 json형식 ("error": 이 부분)
{
    "success": false,
    "timestamp": "2022-07-15T11:23:04.640Z",
    "path": "/catsjhvk",
    "error": {
        "statusCode": 404,
        "message": "Cannot GET /catsjhvk",
        "error": "Not Found"
    }
}

커스텀 후
{
    "success": false,
    "timestamp": "2022-07-15T11:31:03.958Z",
    "statusCode": 404,
    "message": "Cannot GET /catsjhvk",
    "error": "Not Found"
}

Middleware -> Controller -> Service -> Exception
*/
