import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as serviceAccount from '../../../firebaseServiceAccount.json';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: serviceAccount.private_key_id,
    });
  }

  async validate(payload: any) {
    return { user_id: payload.user_id, name: payload.name };
  }
}
