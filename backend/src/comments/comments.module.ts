import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
