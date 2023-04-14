import { Injectable } from '@nestjs/common';

import { CategoriesRepository } from '../infrastructure/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
}
