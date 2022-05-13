import { Joi } from 'express-validation';

export const CreateBillingSchema = {
  body: Joi.object({
    mounthName: Joi.string(),
    billing: Joi.string(),
    year: Joi.string(),
  })
}

export const GetOneBillingSchema = {
  body: Joi.object({
    mounthName: Joi.string(),
    year: Joi.string(),
  })
}