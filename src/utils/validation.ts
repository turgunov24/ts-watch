import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import { isArray } from 'lodash'

type IvalidationSchema = RequestHandler

export const validationMiddleware = (
  validations: IvalidationSchema[] | IvalidationSchema
): RequestHandler[] => {
  return [
    ...(isArray(validations) ? validations : [validations]),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      next()
    },
  ]
}
