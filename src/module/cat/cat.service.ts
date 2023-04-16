import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  hiCatServiceProduct() {
    return 'hello cat!';
  }
}
