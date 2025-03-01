import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().valid('dev', 'prod', 'test').default('dev'),
  PORT: Joi.number().default(5432),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
