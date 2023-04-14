import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

/* Verify the name of the collection */
@Schema({
  collection: 'userss',
  timestamps: true,
  versionKey: false,
})
export class UsersEntity extends Document {
}

export const UsersSchema = SchemaFactory.createForClass(UsersEntity);
