import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '../infrastructure/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
}
