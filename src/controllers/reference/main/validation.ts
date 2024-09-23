import { check, query } from 'express-validator'
import { Joi } from 'express-validation'

import { ITypes } from '../../../models/reference/main/types'

const get = {
  query: Joi.object({
    id: Joi.number().optional(),
    type: Joi.number()
      .valid(...Object.values(ITypes))
      .optional(),
  })
    .xor('id', 'type')
    .options({ abortEarly: false }),
}

const create = {
  query: Joi.object({
    type: Joi.number()
      .valid(...Object.values(ITypes))
      .required(),
  }),
  body: Joi.object({
    regionId: Joi.number().when('query.type', {
      is: Joi.valid(3),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  }),
}

const createValidation = [
  query('type')
    .notEmpty()
    .withMessage('Type is required')
    .bail() // Stop validation chain if empty
    .isNumeric()
    .withMessage('Type must be a number')
    .bail() // Stop validation if not a number
    .custom((value) => Object.values(ITypes).includes(Number(value)))
    .withMessage('Invalid type'),

  // Conditionally validate the body parameter 'regionId' based on query 'type'
  check('regionId')
    .if(query('type').equals('3')) // Check if 'type' equals 3
    .notEmpty()
    .withMessage('regionId is required when type is 3')
    .bail()
    .isNumeric()
    .withMessage('regionId must be a number'),
]

export default { get, create, createValidation }
