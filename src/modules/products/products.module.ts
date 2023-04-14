import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './infrastructure/controllers/products.controller'; 
import { ProductsService } from './domain/products.service'; 
import { ProductsRepository } from './infrastructure/repositories/products.repository';
import { ProductsEntity, ProductsSchema } from './domain/models/entities/products.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductsEntity.name,
        schema: ProductsSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class Products {}