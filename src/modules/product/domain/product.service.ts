import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../infrastructure/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
}
