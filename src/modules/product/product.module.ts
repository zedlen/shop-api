import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './infrastructure/controllers/product.controller'; 
import { ProductService } from './domain/product.service'; 
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { ProductEntity, ProductSchema } from './domain/models/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductEntity.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class Product {}