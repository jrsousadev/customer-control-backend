import { Joi } from 'express-validation';

export const LoginAccountSchema = {
  body: Joi.object({
    email: Joi.string(),
    password: Joi.string().required(),
  }),
}

export const CreateAccountSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
}

export const GetUserSchema = {
  body: Joi.object({
    email: Joi.string().allow(null, ""),
    userId: Joi.string().allow(null, ""),
  })
}