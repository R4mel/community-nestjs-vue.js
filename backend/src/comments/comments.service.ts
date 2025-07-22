import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentRequestDto } from './dto/comment-request.dto';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(commentDto: CommentRequestDto): Promise<Comment> {
    const user = await this.userRepository.findOneBy({
      userId: commentDto.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${commentDto.userId} not found`,
      );
    }

    const post = await this.postRepository.findOneBy({
      postId: commentDto.postId,
    });
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${commentDto.postId} not found`,
      );
    }

    const comment = this.commentRepository.create({
      content: commentDto.content,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['user', 'post'],
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { commentId: id },
      relations: ['user', 'post'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async findByPost(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { postId } },
      relations: ['user', 'post'],
    });
  }

  async update(id: number, commentDto: CommentRequestDto): Promise<Comment> {
    const comment = await this.findOne(id);

    comment.content = commentDto.content;

    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
  }
}
