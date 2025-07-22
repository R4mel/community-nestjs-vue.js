import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentRequestDto } from './dto/comment-request.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() commentDto: CommentRequestDto) {
    const comment = await this.commentsService.create(commentDto);
    return new CommentResponseDto(comment);
  }

  @Get()
  async findAll() {
    const comments = await this.commentsService.findAll();
    return comments.map((comment) => new CommentResponseDto(comment));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comment = await this.commentsService.findOne(+id);
    return new CommentResponseDto(comment);
  }

  @Get('post/:postId')
  async findByPost(@Param('postId') postId: string) {
    const comments = await this.commentsService.findByPost(+postId);
    return comments.map((comment) => new CommentResponseDto(comment));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() commentDto: CommentRequestDto) {
    const comment = await this.commentsService.update(+id, commentDto);
    return new CommentResponseDto(comment);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commentsService.remove(+id);
    return { message: 'Comment deleted successfully' };
  }
}
