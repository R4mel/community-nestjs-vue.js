import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { CategoryResponseDto } from '../../categories/dto/category-response.dto';

@Exclude()
export class PostResponseDto {
  @Expose()
  postId: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  viewCount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @Expose()
  @Type(() => CategoryResponseDto)
  category: CategoryResponseDto;

  constructor(partial: Partial<PostResponseDto>) {
    Object.assign(this, partial);
  }
}
