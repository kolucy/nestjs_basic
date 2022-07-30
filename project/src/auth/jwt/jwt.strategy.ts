import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더의 토큰으로부터 추출한다
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
  }

  // 페이로드 유효성 검증
  // async validate(payload) {}
}
