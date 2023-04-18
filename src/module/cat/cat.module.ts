import { Module, forwardRef } from '@nestjs/common';
import { CatService } from './cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schema/cat.schema';
import { CatController } from './cat.controller';
import { CatRepository } from './cat.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule), // !! 순환참조 방지
  ], // !! 외부 모듈을 가져올 수 있다.
  controllers: [CatController],
  providers: [CatService, CatRepository], // !! 해당 모듈에서만 사용할 수 있다.
  exports: [CatService, CatRepository], // !! 외부 모듈에서 import 하면 사용할 수 있도록 하려면 export 해야 함
})
export class CatModule {}
