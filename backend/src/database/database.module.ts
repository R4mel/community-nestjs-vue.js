import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeeder } from './database.seeder';
import { Category } from '../categories/category.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User])],
  providers: [DatabaseSeeder],
})
export class DatabaseModule {}
