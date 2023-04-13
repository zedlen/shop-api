import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FeatureFlagController } from './infrastructure/controllers/feature-flag.controller';
import { FeatureFlagService } from './domain/feature-flag.service';
import { FeatureFlagRepository } from './infrastructure/repositories/feature-flag.repository';
import { FeatureFlagEntity, FeatureFlagSchema } from './domain/models/entities/feature-flag.entity';
import { AuthGuard } from './../../core/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FeatureFlagEntity.name,
        schema: FeatureFlagSchema,
      },
    ]),
  ],
  controllers: [FeatureFlagController],
  providers: [FeatureFlagService, FeatureFlagRepository, AuthGuard],
})
export class FeatureFlag {}
