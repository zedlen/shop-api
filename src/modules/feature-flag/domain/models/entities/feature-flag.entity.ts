import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'featureFlags',
  timestamps: true,
  versionKey: false,
})
export class FeatureFlagEntity extends Document {
  @Prop({ type: String, unique: true, required: true, trim: true })
  public code: string;

  @Prop({ type: String, required: true, trim: true })
  public description: string;

  @Prop({ type: Boolean, required: false, default: false })
  public enable_all: boolean;

  @Prop({ type: [Number], required: true, trim: true })
  public sellers: number[];
}

export const FeatureFlagSchema = SchemaFactory.createForClass(FeatureFlagEntity);
