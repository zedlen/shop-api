import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

/* Verify the name of the collection */
@Schema({
  collection: 'categories',
  timestamps: true,
  versionKey: false,
})
export class CategoryEntity extends Document {
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
