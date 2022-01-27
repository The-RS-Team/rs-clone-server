import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from './strategies/local.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {UsersModule} from '../modules/users/users.module';
import {jwtConstants} from '../app.constants';
import {JwtStrategy} from './strategies/jwt.strategy';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {APP_GUARD} from '@nestjs/core';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        }
    ],
    exports: [AuthService],
})
export class AuthModule {
}
