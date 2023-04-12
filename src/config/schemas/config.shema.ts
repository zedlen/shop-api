import * as Joi from '@hapi/joi';

export const ConfigSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development', 'production', 'staging', 'uat')
    .default('development'),
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().required().default(3000),
  VERSION: Joi.number().required().default(1),

  MONGODB_HOST: Joi.string().required(),
  MONGODB_PORT: Joi.number().required(),
  MONGODB_DATABASE: Joi.string().required().default('dev_center'),
  MONGODB_USER: Joi.string().allow(null, ''),
  MONGODB_PASSWORD: Joi.string().allow(null, ''),
  MONGODB_AUTHSOURCE: Joi.string(),

});
