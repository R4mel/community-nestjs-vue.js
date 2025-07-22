import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryRequestDto } from './dto/category-request.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() categoryDto: CategoryRequestDto) {
    const category = await this.categoriesService.create(categoryDto);
    return new CategoryResponseDto(category);
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return categories.map((category) => new CategoryResponseDto(category));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);
    return new CategoryResponseDto(category);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() categoryDto: CategoryRequestDto,
  ) {
    const category = await this.categoriesService.update(+id, categoryDto);
    return new CategoryResponseDto(category);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(+id);
    return { message: 'Category deleted successfully' };
  }
}
