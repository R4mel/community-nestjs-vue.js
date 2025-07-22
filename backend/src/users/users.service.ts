import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRequestDto } from './dto/user-request.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserRequestDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['comments', 'posts'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { userId: id },
      relations: ['comments', 'posts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findBySocialId(socialId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { socialId },
      relations: ['comments', 'posts'],
    });

    if (!user) {
      throw new NotFoundException(`User with social ID ${socialId} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UserUpdateDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.nickname) {
      user.nickname = updateUserDto.nickname;
    }

    if (updateUserDto.profileImage) {
      user.profileImage = updateUserDto.profileImage;
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
