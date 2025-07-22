import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoryStatus } from '../categoryStatus.entity';

export class CategoryRequestDto {
  @IsEnum(CategoryStatus)
  @IsNotEmpty()
  status: CategoryStatus;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
