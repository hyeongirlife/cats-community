import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, SchemaOptions, Document } from 'mongoose';
import { Comments } from 'src/module/comments/shema/comment.schema';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options) // !! DB에 들어갈 스키마를 자동으로 정의
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default: '',
  }) // !! defulat 이미지 삽입
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };
  readonly comments: Comments[];
}

export const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  // !! DB에서 필요한 데이터만 보여주는 메소드
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});

_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
