import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './infrastructure/controllers/categories.controller'; 
import { CategoriesService } from './domain/categories.service'; 
import { CategoriesRepository } from './infrastructure/repositories/categories.repository';
import { CategoriesEntity, CategoriesSchema } from './domain/models/entities/categories.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoriesEntity.name,
        schema: CategoriesSchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class Categories {}