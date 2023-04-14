import { Injectable } from '@nestjs/common';

import { ProductsRepository } from '../infrastructure/repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
}
