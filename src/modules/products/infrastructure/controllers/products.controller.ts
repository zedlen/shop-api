import { Controller, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';

import { ProductsService } from '../../domain/products.service';

/* verify that this is the name of the controller you want */
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
}