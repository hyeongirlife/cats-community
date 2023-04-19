import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception-filter';
import { LoggingInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cat.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('cat')
export class CatController {
  // !! 소비자 : controller, 제품 : service, 공급자 : module
  constructor(
    private catService: CatService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData; // !! Virtual 데이터를 보여주는 방법
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() body: CatRequestDto) {
    return await this.catService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(@Body() body: LoginRequestDto) {
    return await this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 포스트 등록' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
