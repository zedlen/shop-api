import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

/* Verify the name of the collection */
@Schema({
  collection: 'categoriess',
  timestamps: true,
  versionKey: false,
})
export class CategoriesEntity extends Document {
}

export const CategoriesSchema = SchemaFactory.createForClass(CategoriesEntity);
