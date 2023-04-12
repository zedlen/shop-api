import * as path from 'path';
import { ConfigModuleOptions } from '@nestjs/config';
import { serverConfigLoader } from '../loaders/server.loader';
import { ConfigSchema } from '../schemas/config.shema';
const distFolder = RegExp('\\' + escape(path.sep) + 'dist');

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: path.join(__dirname.replace(distFolder, ''), '..', '.env'),
  isGlobal: true,
  validationSchema: ConfigSchema,
  validationOptions: {
    allowUnknow: false,
    abortEarly: true,
  },
  load: [serverConfigLoader],
  cache: true,
};
