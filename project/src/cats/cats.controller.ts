import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  getAllCat() {
    // throw new HttpException('api is broken', 401);
    // throw new HttpException({ success: false, message: 'api is broken' }, 401);
    console.log('hello controller');
    return { cats: 'all cat' };
  }

  // cats/:id
  @Get(':id')
  // 파라미터의 인자로 key값('id')을 알려주면 param에 value만 넘어온다
  // ParseIntPipe: string -> int 변환
  // data: 'id', Task1: ParseIntPipe, Task2: PositiveIntPipe
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param); // { id: '123' } -> 123
    console.log(typeof param); // string -> int
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete service';
  }
}
