import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './schema/cat.schema';
import { CatRequestDto } from './dto/cat.request.dto';
import * as mongoose from 'mongoose';
import { CommentSchema, Comments } from '../comments/shema/comment.schema';

@Injectable()
export class CatRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentModel: Model<Comment>,
  ) {}

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `${process.env.API_HOST}/media/${fileName}`;

    const result = await cat.save();
    console.log('result', result);
    return result.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');

    if (!cat) {
      throw new UnauthorizedException('접근 오류');
    }
    return cat; // !! req.user 안에 들어감
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    try {
      const result = await this.catModel.findOne({ email });
      return result;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const CommentsModel = mongoose.model('comments', CommentSchema);
      const result = await this.catModel
        .find()
        .populate({ path: 'comments', model: this.commentModel });

      return result;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async existByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });

      if (result) return true;

      return false;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    try {
      return await this.catModel.create(cat);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
