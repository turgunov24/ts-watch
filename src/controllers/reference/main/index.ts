import { Request, Response } from 'express'
import Joi from 'joi'

import { referenceMainService } from '../../../services/referenceMain.service'
import { ITypes } from '../../../models/reference/main/types'
import ReferenceMain from '../../../models/reference/main'
import { validationResult } from 'express-validator'

const get = async (req: Request, res: Response) => {
  try {
    const { id, type } = req.query

    if (type) {
      const references = await referenceMainService.index(type as string)

      return res.json({ references })
    } else {
      const reference = await referenceMainService.get(id as string)

      return res.json(reference.toJSON())
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    return res.status(500).json({ message: 'Internal server error' })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { type } = req.query
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    res.json({ message: 'hey', a: req.body })
  } catch (error: unknown) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    if (!id) return res.status(400).json({ message: 'Id is required' })

    if (!isFinite(+id!)) return res.status(400).json({ message: 'Invalid id' })

    const { error } = Joi.object({
      name: Joi.string().min(1).required(),
    }).validate(req.body)

    if (error)
      return res.status(400).json({ message: error.details[0].message })

    const reference = await ReferenceMain.findByPk(+id!)

    if (!reference)
      return res.status(400).json({ message: 'Reference not found' })

    await reference.update(req.body)

    res.json({ message: 'Reference updated', reference: reference.toJSON() })
  } catch (error: unknown) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    if (!id) return res.status(400).json({ message: 'Id is required' })

    if (!isFinite(+id!)) return res.status(400).json({ message: 'Invalid id' })

    await ReferenceMain.destroy({ where: { id: +id! } })
    res.json({ message: 'Reference deleted' })
  } catch (error: unknown) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export { get, create, update, remove }
