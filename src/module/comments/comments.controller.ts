import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from './dto/comment.create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 대한 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentService.getAllComments();
  }

  @ApiOperation({ summary: '고양이 프로필 댓글 등록하기' })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentService.createComment(id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기' })
  @Patch(':id')
  async plusLikeCount(@Param('id') id: string) {
    return this.commentService.plusLikeCount(id);
  }

  // !! 내가 직접해보기
  // @ApiOperation({ summary: '고양이 프로필 댓글 삭제하기' })
  // @Delete(':id')
  // async deleteComment(@Param('id') id: string) {
  //   return this.commentService.deleteComment(id);
  // }
}
