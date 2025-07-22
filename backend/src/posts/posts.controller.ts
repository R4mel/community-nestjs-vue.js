import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostRequestDto } from './dto/post-request.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { PostResponseDto } from './dto/post-response.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: PostRequestDto) {
    const post = await this.postsService.create(createPostDto);
    return new PostResponseDto(post);
  }

  @Get()
  async findAll(@Query('categoryId') categoryId?: string) {
    const posts = categoryId
      ? await this.postsService.findByCategory(+categoryId)
      : await this.postsService.findAll();
    return posts.map((post) => new PostResponseDto(post));
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    const posts = await this.postsService.findByUser(+userId);
    return posts.map((post) => new PostResponseDto(post));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(+id);
    return new PostResponseDto(post);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: PostUpdateDto) {
    const post = await this.postsService.update(+id, updatePostDto);
    return new PostResponseDto(post);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(+id);
    return { message: 'Post deleted successfully' };
  }
}
