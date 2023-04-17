import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CatRequestDto } from './dto/cat.request.dto';
import { Model } from 'mongoose';
import { Cat } from './schema/cat.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      // throw new HttpException('해당하는 고양이가 이미 존재합니다.', 403);
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hash = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({ email, name, password: hash });

    return cat.readOnlyData;
  }
}
