import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/module/cat/schema/cat.schema';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
