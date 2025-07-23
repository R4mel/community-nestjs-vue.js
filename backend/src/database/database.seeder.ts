import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/category.entity';
import { User } from '../users/user.entity';
import { CategoryStatus } from '../categories/categoryStatus.entity';

@Injectable()
export class DatabaseSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    // Check if categories already exist
    const categoriesCount = await this.categoryRepository.count();
    if (categoriesCount === 0) {
      await this.seedCategories();
    }

    // Check if users already exist
    const usersCount = await this.userRepository.count();
    if (usersCount === 0) {
      await this.seedUsers();
    }
  }

  private async seedCategories() {
    const categories = [
      {
        name: 'Free Board',
        description: 'General discussion and free conversation',
        status: CategoryStatus.FREE,
      },
      {
        name: 'Tips & Tricks',
        description: 'Share useful tips and programming tricks',
        status: CategoryStatus.TIPS,
      },
      {
        name: 'Q&A',
        description: 'Ask questions and get help from the community',
        status: CategoryStatus.QUESTIONS,
      },
    ];

    for (const categoryData of categories) {
      const category = this.categoryRepository.create(categoryData);
      await this.categoryRepository.save(category);
    }

    console.log('✅ Categories seeded successfully');
  }

  private async seedUsers() {
    const users = [
      {
        socialId: 'demo_user_1',
        nickname: 'DemoUser1',
        profileImage: 'https://via.placeholder.com/100x100?text=U1',
        isAdmin: false,
      },
      {
        socialId: 'admin_user',
        nickname: 'Admin',
        profileImage: 'https://via.placeholder.com/100x100?text=AD',
        isAdmin: true,
      },
    ];

    for (const userData of users) {
      const user = this.userRepository.create(userData);
      await this.userRepository.save(user);
    }

    console.log('✅ Users seeded successfully');
  }
}
