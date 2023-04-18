import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CatModule } from '../cat/cat.module';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CatModule), // !! 순환참조 방지
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
