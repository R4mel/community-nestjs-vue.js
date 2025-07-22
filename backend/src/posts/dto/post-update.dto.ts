import { IsOptional, IsString } from 'class-validator';

export class PostUpdateDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
