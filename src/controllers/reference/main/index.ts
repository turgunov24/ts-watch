import { Request, Response } from 'express'
import { pick } from 'lodash'

import { referenceMainService } from '../../../services/referenceMain.service'

const get = async (req: Request, res: Response) => {
  try {
    const { id, type } = req.query

    if (type) {
      const references = await referenceMainService.index(type as string)
      console.log('references', references)
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

    const reference = await referenceMainService.create(
      type as string,
      req.body
    )

    res.status(201).json({
      message: 'reference succesfully created',
      reference: pick(reference.toJSON(), ['id', 'name']),
    })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    const reference = await referenceMainService.update(id as string, req.body)

    res.json({ message: 'Reference updated', reference: reference.toJSON() })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    res.status(500).json({ message: 'Internal server error' })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    await referenceMainService.remove(id as string)

    res.json({ message: 'Reference deleted' })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export { get, create, update, remove }
