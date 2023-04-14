import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductsEntity } from '../../domain/models/entities/products.entity';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(ProductsEntity.name) private readonly model: Model<ProductsEntity>) {}
}