import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception-filter';
import { LoggingInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cat.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('cat')
export class CatController {
  // !! 소비자 : controller, 제품 : service, 공급자 : module
  constructor(private catService: CatService) {}

  @ApiOperation({ summary: '고양이 리스트 조회' })
  @Get()
  getCurrentCat() {
    return 'current cat';
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
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return 'login';
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
