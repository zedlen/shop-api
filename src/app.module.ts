import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { ApplicationCoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    HealthModule,
    ApplicationCoreModule,
    ConfigModule,
  ],
})
export class AppModule {}
