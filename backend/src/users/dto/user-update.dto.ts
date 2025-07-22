import { IsString, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
