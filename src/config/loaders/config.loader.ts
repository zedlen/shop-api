import { ConfigLoader } from '../types/config-loader.type';
import { boolean } from '../../utils/shared/shared.utils';

export const configLoader = (): ConfigLoader => ({
  server: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    enviroment: process.env.NODE_ENV,
    version: parseInt(process.env.VERSION),
  },
  database: {
    host: process.env.MONGODB_HOST,
    port: parseInt(process.env.MONGODB_PORT),
    dababase_name: process.env.MONGODB_DATABASE,
    database_user: process.env.MONGODB_USER,
    database_password: process.env.MONGODB_PASSWORD,
    auth_source: process.env.MONGODB_AUTHSOURCE,
    ssl: boolean(process.env.MONGODB_SSL),
    retry_writes: boolean(process.env.MONGODB_RETRY_WRITES),
  },
  redis: {
    url: process.env.REDIS_URL,
  }
});
