import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryStatus } from './categoryStatus.entity';
import { Post } from '../posts/post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({
    type: 'enum',
    enum: CategoryStatus,
    default: CategoryStatus.FREE,
  })
  status: CategoryStatus;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
