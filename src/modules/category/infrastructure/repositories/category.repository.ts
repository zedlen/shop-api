import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryEntity } from '../../domain/models/entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(@InjectModel(CategoryEntity.name) private readonly model: Model<CategoryEntity>) {}
}