import { registerAs } from '@nestjs/config';
import { configLoader } from './config.loader';
import { MongodbConfigType } from './../../utils/types';

export const mongodbConfigLoader = registerAs(
  'mongodb',
  (): MongodbConfigType => configLoader().database,
);
