import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// guard 또한 의존성 주입이 가능한 클래스
// AuthGuard 상속 - AuthGuard: strategy를 자동으로 실행해주는 기능 존재
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
