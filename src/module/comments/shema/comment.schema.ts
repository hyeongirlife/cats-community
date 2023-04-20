import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { HydratedDocument, SchemaOptions, Document, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comments>;

const options: SchemaOptions = {
  timestamps: true,
  collection: 'comments',
};

@Schema(options) // !! DB에 들어갈 스키마를 자동으로 정의
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
    required: true,
  })
  @Prop({
    default: 0,
  })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: '직성 대상 (게시물, 정보글)',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
