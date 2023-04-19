import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cat.request.dto';
import * as bcrypt from 'bcrypt';
import { CatRepository } from './cat.repository';
import { Cat } from './schema/cat.schema';

@Injectable()
export class CatService {
  // constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  constructor(private readonly catRepository: CatRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catRepository.existByEmail(email);

    if (isCatExist) {
      // throw new HttpException('해당하는 고양이가 이미 존재합니다.', 403);
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hash = await bcrypt.hash(password, 10);

    const cat = await this.catRepository.create({
      email,
      name,
      password: hash,
    });

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File) {
    const fileName = `cats/${files.filename}`;
    console.log(`fileName: ${fileName}`);
    const newCat = await this.catRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(`new File: ${newCat}`);
    return newCat;
  }
}
