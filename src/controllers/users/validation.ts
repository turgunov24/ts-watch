import { Joi } from 'express-validation'

const create = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false }),
}

const update = {
  query: Joi.object({
    id: Joi.string().required(),
  }).options({ abortEarly: false }),
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false }),
}

const get = {
  query: Joi.object({
    id: Joi.number().optional(),
  }),
}

const remove = {
  query: Joi.object({
    id: Joi.number().required(),
  }),
}

export default { get, remove, create, update }
