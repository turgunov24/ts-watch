import { body, query } from 'express-validator'

const get = query('id')
  .optional()
  .isNumeric()
  .withMessage('id must be a number')

const create = body('name').notEmpty().withMessage('name is required')

const update = [
  query('id')
    .notEmpty()
    .withMessage('id is required')
    .bail()
    .isNumeric()
    .withMessage('id must be a number')
    .bail(),
  body('name').notEmpty().withMessage('name is required'),
]

const remove = query('id')
  .notEmpty()
  .withMessage('id is required')
  .bail()
  .isNumeric()
  .withMessage('id must be a number')
  .bail()

export default { get, create, update,remove }
