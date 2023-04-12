import {
  ServerConfigTypes,
  MongodbConfigType,
  RedisTypes
} from '../../utils/types';

export type ConfigLoader = {
  server: ServerConfigTypes;
  database: MongodbConfigType;
  redis: RedisTypes;
};
