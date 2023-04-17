import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schema/cat.schema';
import { CatController } from './cat.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])], // !! 외부 모듈을 가져올 수 있다.
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService], // !! 외부 모듈에 주입할 수 있다.
})
export class CatModule {}
