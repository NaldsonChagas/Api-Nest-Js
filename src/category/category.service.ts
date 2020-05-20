import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor (@InjectRepository(Category)
    private categoryRepository: Repository<Category>) {}

  findOne (categoryId: number): Promise<Category> {
    return this.categoryRepository.findOne(categoryId);
  }
}
