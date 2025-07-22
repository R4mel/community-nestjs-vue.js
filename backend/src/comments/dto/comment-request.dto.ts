import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentRequestDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
