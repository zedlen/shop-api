import { registerAs } from '@nestjs/config';
import { configLoader } from './config.loader';
import { ServerConfigTypes } from './../../utils/types';

export const serverConfigLoader = registerAs(
  'server',
  (): ServerConfigTypes => configLoader().server,
);
