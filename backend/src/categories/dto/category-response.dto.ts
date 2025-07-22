import { Exclude, Expose } from 'class-transformer';
import { CategoryStatus } from '../categoryStatus.entity';

@Exclude()
export class CategoryResponseDto {
  @Expose()
  categoryId: number;

  @Expose()
  status: CategoryStatus;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<CategoryResponseDto>) {
    Object.assign(this, partial);
  }
}
