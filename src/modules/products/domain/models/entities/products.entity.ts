import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

/* Verify the name of the collection */
@Schema({
  collection: 'productss',
  timestamps: true,
  versionKey: false,
})
export class ProductsEntity extends Document {
}

export const ProductsSchema = SchemaFactory.createForClass(ProductsEntity);
