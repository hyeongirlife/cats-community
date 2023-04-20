import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from './dto/comment.create.dto';
import { CatRepository } from '../cat/cat.repository';
import { Model } from 'mongoose';
import { Comments } from './shema/comment.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catRepository: CatRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, commentData: CommentsCreateDto) {
    try {
      const targetCat = await this.catRepository.findCatByIdWithoutPassword(id);
      const { contents, author } = commentData;

      const validatedAuthor =
        await this.catRepository.findCatByIdWithoutPassword(author);

      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLikeCount(id: string) {
    try {
      console.log('좋아요 서비스 실행');
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
