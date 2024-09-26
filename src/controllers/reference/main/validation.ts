import { body, query } from 'express-validator'
import { Request } from 'express'

import { ITypes } from '../../../models/reference/main/types'

export const get = [
  query().custom((value: Request['query']) => {
    const { id, type } = value

    if (!id && !type) {
      throw new Error('Either "id" or "type" must be provided')
    }

    if (id && type) {
      throw new Error('Only one of "id" or "type" must be provided')
    }

    return true
  }),
  query('id').optional().isNumeric().withMessage('id must be a number'),

  query('type')
    .optional()
    .isNumeric()
    .withMessage('Type must be a number')
    .custom((value) => Object.values(ITypes).includes(Number(value)))
    .withMessage('Invalid type'),
]

const create = [
  query('type')
    .notEmpty()
    .withMessage('Type is required')
    .bail()
    .isNumeric()
    .withMessage('Type must be a number')
    .bail()
    .custom((value) => {
      const numValue = Number(value)
      return Object.values(ITypes).includes(numValue)
    })
    .withMessage('Invalid type'),
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .bail()
    .isString()
    .withMessage('name must be a string')
    .bail(),
  body('countryId')
    .if(query('type').isIn([ITypes.region, ITypes.district]))
    .notEmpty()
    .withMessage('countryId is required')
    .bail()
    .isNumeric()
    .withMessage('countryId must be a number'),
  body('regionId')
    .if(query('type').equals(String(ITypes.district)))
    .notEmpty()
    .withMessage('regionId is required')
    .bail()
    .isNumeric()
    .withMessage('regionId must be a number'),
]

const update = [
  query('id')
    .notEmpty()
    .withMessage('id is required')
    .bail()
    .isNumeric()
    .withMessage('id must be a number')
    .bail(),
  query('type')
    .notEmpty()
    .withMessage('Type is required')
    .bail()
    .isNumeric()
    .withMessage('Type must be a number')
    .bail()
    .custom((value) => Object.values(ITypes).includes(Number(value)))
    .withMessage('Invalid type')
    .bail(),
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .bail()
    .isString()
    .withMessage('name must be a string')
    .bail(),
  body('countryId')
    .if(query('type').isIn([ITypes.region, ITypes.district]))
    .notEmpty()
    .withMessage('countryId is required')
    .bail()
    .isNumeric()
    .withMessage('countryId must be a number')
    .bail(),
  body('regionId')
    .if(query('type').equals(String(ITypes.district)))
    .notEmpty()
    .withMessage('regionId is required')
    .bail()
    .isNumeric()
    .withMessage('regionId must be a number'),
]

const remove = [
  query('id')
    .notEmpty()
    .withMessage('id is required')
    .bail()
    .isNumeric()
    .withMessage('id must be a number'),
]

export default { get, create, update, remove }
