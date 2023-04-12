export interface RedisServiceInterface {
  save(key: string, payload: unknown, ttl?: number): Promise<boolean | never>;
  saveWithExArgument(key: string, payload: unknown, ex: number): Promise<boolean>;
  update(key: string, payload: unknown): Promise<'OK'>;
  increment(key: string): Promise<number>;
  get(key: string): Promise<unknown>;
  delete(key: string): Promise<number>;
}
