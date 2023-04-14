import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoriesEntity } from '../../domain/models/entities/categories.entity';

@Injectable()
export class CategoriesRepository {
  constructor(@InjectModel(CategoriesEntity.name) private readonly model: Model<CategoriesEntity>) {}
}