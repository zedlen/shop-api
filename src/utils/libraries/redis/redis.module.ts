import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { RedisService } from './domain/redis.service';
import { configLoader } from './../../../config/loaders/config.loader';


@Module({
  imports: [
    RedisModule.register({
      url: configLoader().redis.url,
      onClientReady: (client) => {
        client.on('error', (err) => {          
        });
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisConnectionModule {}
