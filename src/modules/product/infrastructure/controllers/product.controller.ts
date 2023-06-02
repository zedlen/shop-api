import { Controller, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';

import { ProductService } from '../../domain/product.service';

/* verify that this is the name of the controller you want */
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}