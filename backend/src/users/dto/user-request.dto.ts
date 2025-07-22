import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  socialId: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
