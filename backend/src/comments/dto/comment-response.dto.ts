import { Exclude, Expose } from 'class-transformer';
import { User } from '../../users/user.entity';
import { Post } from '../../posts/post.entity';

@Exclude()
export class CommentResponseDto {
  @Expose()
  commentId: number;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  user: User;

  @Expose()
  post: Post;

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial);
  }
}
