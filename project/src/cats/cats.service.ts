import { Injectable } from '@nestjs/common';

@Injectable() // @Injectable()이 붙으면 provider라는 의미
export class CatsService {
  hiCatServiceProduct() {
    return 'hello cat!';
  }
}
