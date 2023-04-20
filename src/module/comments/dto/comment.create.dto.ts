import { PickType } from '@nestjs/swagger';
import { Comments } from '../shema/comment.schema';

export class CommentsCreateDto extends PickType(Comments, [
  'contents',
  'author',
] as const) {}
