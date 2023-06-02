import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductEntity } from '../../domain/models/entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel(ProductEntity.name) private readonly model: Model<ProductEntity>) {}
}