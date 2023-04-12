import { Module } from '@nestjs/common';

import { HealthController } from './infrastructure/controllers/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class HealthModule {}
