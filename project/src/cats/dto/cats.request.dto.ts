import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}

// type 또는 interface로 하지 않고 class를 사용하는 이유:
// 데코레이터 패턴을 적용할 수도 있고, 상속을 통해 재사용성을 증가시킬 수 있기 때문
