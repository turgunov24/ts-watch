import { Request, Response } from 'express'

import { referenceCountriesService } from '../../../services/reference/countries.service'

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    if (id) {
      const country = await referenceCountriesService.get(id as string)
      return res.json(country.toJSON())
    }
    const countries = await referenceCountriesService.index()
    res.json({ data: countries })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    return res.status(500).json({ message: 'Internal server error' })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const country = await referenceCountriesService.create(req.body)

    res.status(201).json({
      reference: country.toJSON(),
      message: 'country succesfully created',
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

    const country = await referenceCountriesService.update(
      id as string,
      req.body
    )

    res.json({ message: 'country updated', reference: country.toJSON() })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    res.status(500).json({ message: 'Internal server error' })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    await referenceCountriesService.remove(id as string)

    res.json({ message: 'country deleted' })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export { get, create, update, remove }
