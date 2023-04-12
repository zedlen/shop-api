import { Injectable } from '@nestjs/common';
import { RedisService as redis } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { RedisException } from './redis.exception';
import { RedisServiceInterface } from './redis.interfaces';

@Injectable()
export class RedisService implements RedisServiceInterface {
  private client: Redis;
  private _payload: string;

  private set TransformObjectToString(payload: unknown) {
    typeof payload !== 'string' || typeof payload !== 'number'
      ? (this._payload = JSON.stringify(payload))
      : (this._payload = payload);
  }

  constructor(private readonly redisService: redis) {
    this.client = this.redisService.getClient();
  }

  async save(key: string, payload: unknown, ttl = 300): Promise<boolean | never> {
    this.TransformObjectToString = payload;

    const result = await this.client.set(key, this._payload, 'EX', ttl, 'NX');

    if (result) return true;

    throw new RedisException();
  }

  async saveWithExArgument(key: string, payload: unknown, ex: number): Promise<boolean> {
    this.TransformObjectToString = payload;

    const result = await this.client.set(key, this._payload, 'EX', ex, 'NX');

    if (result) return true;

    throw new RedisException();
  }

  async update(key: string, payload: unknown): Promise<'OK'> {
    this.TransformObjectToString = payload;

    return await this.client.set(key, this._payload);
  }

  async increment(key: string): Promise<number> {
    return await this.client.incr(key);
  }

  async get(key: string): Promise<unknown> {
    const data = await this.client.get(key);

    if (!data) return null;
    if (data) return JSON.parse(data);
  }

  async delete(key: string): Promise<number> {
    return await this.client.del(key);
  }
}
