import { OmitType } from '@nestjs/swagger';
import { Cat } from '../schema/cat.schema';

export class CatCurrentDto extends OmitType(Cat, ['password'] as const) {}
