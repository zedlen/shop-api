import { Controller, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';

import { CategoryService } from '../../domain/category.service';

/* verify that this is the name of the controller you want */
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
}