import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

/* Verify the name of the collection */
@Schema({
  collection: 'products',
  timestamps: true,
  versionKey: false,
})
export class ProductEntity extends Document {
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
