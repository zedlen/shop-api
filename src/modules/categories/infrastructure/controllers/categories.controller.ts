import { Controller, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';

import { CategoriesService } from '../../domain/categories.service';

/* verify that this is the name of the controller you want */
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
}