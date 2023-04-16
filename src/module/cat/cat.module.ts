import { Module } from '@nestjs/common';
import { CatService } from './cat.service';

@Module({
  imports: [CatModule], // !! 외부 모듈을 가져올 수 있다.
  providers: [CatService],
  exports: [CatService], // !! 외부 모듈에 주입할 수 있다.
})
export class CatModule {}
