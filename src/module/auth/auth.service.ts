import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRepository } from '../cat/cat.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catRepository: CatRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    const cat = await this.catRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일을 확인해주세요');
    }

    const isPasswordValidated = await bcrypt.compare(password, cat.password);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호를 확인해주세요');
    }
    // !! jwt 생성
    const payload = { email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
    };
  }
}
