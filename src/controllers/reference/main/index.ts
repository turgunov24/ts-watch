import ReferenceMain from '../../../models/reference/main'
import { Request, Response } from 'express'
import Joi from 'joi'

enum ITypes {
  country = 1,
  region = 2,
  district = 3,
}

const get = async (req: Request, res: Response) => {
  try {
    const { id, type } = req.query

    if (!id && !type) {
      return res.status(400).json({ message: 'Id or type required' })
    }

    if (type) {
      if (!((+type) in ITypes))
        return res.status(400).json({ message: 'Invalid type' })

      const references = await ReferenceMain.findAll({
        where: { type: type as any },
      })

      return res.json({ references })
    } else {
      if (!isFinite(+id!))
        return res.status(400).json({ message: 'Invalid id' })

      const reference = await ReferenceMain.findByPk(+id!)

      if (!reference)
        return res.status(400).json({ message: 'Reference not found' })

      return res.json(reference.toJSON())
    }
  } catch (error: unknown) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { type } = req.query

    if (!type) return res.status(400).json({ message: 'Type is required' })

    if (!((+type) in ITypes))
      return res.status(400).json({ message: 'Invalid type' })

    let schema

    switch (+type) {
      case 2:
        schema = Joi.object({
          name: Joi.string().min(1).required(),
          countryId: Joi.number().min(1).required(),
        })
        break
      case 3:
        schema = Joi.object({
          name: Joi.string().min(1).required(),
          districtId: Joi.number().min(1).required(),
        })
        break
      default:
        schema = Joi.object({
          name: Joi.string().min(1).required(),
        })
        break
    }

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).json({ message: error.details })

    const reference = await ReferenceMain.create({
      type: type as any,
      ...req.body,
    })

    res.json({ message: 'Reference created', reference: reference.toJSON() })
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

export { create, get, update, remove }
