import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostRequestDto } from './dto/post-request.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createPostDto: PostRequestDto): Promise<Post> {
    const user = await this.usersRepository.findOneBy({
      userId: createPostDto.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPostDto.userId} not found`,
      );
    }

    const category = await this.categoriesRepository.findOneBy({
      categoryId: createPostDto.categoryId,
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createPostDto.categoryId} not found`,
      );
    }

    const post = this.postsRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      userId: createPostDto.userId,
      categoryId: createPostDto.categoryId,
      viewCount: 0,
    });

    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user', 'category', 'comments'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { postId: id },
      relations: ['user', 'category', 'comments', 'comments.user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // 조회수 증가
    post.viewCount += 1;
    await this.postsRepository.save(post);

    return post;
  }

  async findByUser(userId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { userId },
      relations: ['user', 'category', 'comments'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByCategory(categoryId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { categoryId },
      relations: ['user', 'category', 'comments'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: number, updatePostDto: PostUpdateDto): Promise<Post> {
    const post = await this.findOne(id);

    if (updatePostDto.title) {
      post.title = updatePostDto.title;
    }

    if (updatePostDto.content) {
      post.content = updatePostDto.content;
    }

    return this.postsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
  }
}
