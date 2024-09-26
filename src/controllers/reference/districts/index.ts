import { Request, Response } from 'express'

import { referencesDistrictsService } from '../../../services/reference/districts.service'

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    if (id) {
      const district = await referencesDistrictsService.get(id as string)
      return res.json(district.toJSON())
    }
    const countries = await referencesDistrictsService.index()
    res.json({ data: countries })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    return res.status(500).json({ message: 'Internal server error' })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const district = await referencesDistrictsService.create(req.body)

    res.status(201).json({
      reference: district.toJSON(),
      message: 'district succesfully created',
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

    const district = await referencesDistrictsService.update(
      id as string,
      req.body
    )

    res.json({ message: 'district updated', reference: district.toJSON() })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    res.status(500).json({ message: 'Internal server error' })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    await referencesDistrictsService.remove(id as string)

    res.json({ message: 'district deleted' })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export { get, create, remove, update }
