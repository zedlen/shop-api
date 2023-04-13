import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { ApplicationCoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { FeatureFlag } from './modules/feature-flag/feature-flag.module';


@Module({
  imports: [
    HealthModule,
    ApplicationCoreModule,
    ConfigModule,
    FeatureFlag
  ],
})
export class AppModule {}
