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
import { CatRequestDto } from './dto/cats.request.dto';

@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('cat')
export class CatController {
  // !! 소비자 : controller, 제품 : service, 공급자 : module
  constructor(private catService: CatService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return 'signup';
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
