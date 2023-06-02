import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './infrastructure/controllers/category.controller'; 
import { CategoryService } from './domain/category.service'; 
import { CategoryRepository } from './infrastructure/repositories/category.repository';
import { CategoryEntity, CategorySchema } from './domain/models/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoryEntity.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class Category {}