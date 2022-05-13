import { Joi } from 'express-validation';

export const CreateCustomerSchema = {
  body: Joi.object({
    name: Joi.string(),
    responsibleName: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    value: Joi.number(),
    dueDate: Joi.string(),
    paymentMethod: Joi.string(),
    serviceStart: Joi.string(),
  }),
}

export const GetCustomerSchema = {
  body: Joi.object({
    customerId: Joi.string(),
  }),
}

export const UpdateCustomerSchema = {
  body: Joi.object({
    customerId: Joi.string(),
    name: Joi.string().allow(null, ""),
    responsibleName: Joi.string().allow(null, ""),
    email: Joi.string().allow(null, ""),
    phone: Joi.string().allow(null, ""),
    value: Joi.string().allow(null, ""),
    dueDate: Joi.string().allow(null, ""),
    paymentMethod: Joi.string().allow(null, ""),
    serviceStart: Joi.string().allow(null, ""),
  }),
}

export const DeleteCustomerSchema = {
  body: Joi.object({
    customerId: Joi.string(),
  }),
}

export const UpdateDueDateCustomerSchema = {
  body: Joi.object({
    customerId: Joi.string(),
    dueDate: Joi.string(),
  })
}

export const PaymentSuccessCustomerSchema = {
  body: Joi.object({
    customerId: Joi.string(),
  })
}