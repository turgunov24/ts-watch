import { DatabaseError } from 'sequelize'

import ReferenceCountries from '../../models/reference/countries'

export const referenceCountriesService = {
  index: async () => {
    try {
      const references = await ReferenceCountries.findAll()
      return references
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  create: async (data: any) => {
    try {
      const country = await ReferenceCountries.create(data)
      return country
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  update: async (id: string, data: any) => {
    try {
      const user = await ReferenceCountries.findByPk(id)

      if (!user) {
        throw new Error('Country not found')
      }
      await user.update(data)

      return user
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  get: async (id: string) => {
    try {
      const user = await ReferenceCountries.findByPk(id)

      if (!user) {
        throw new Error('Country not found')
      }

      return user
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  remove: async (id: string) => {
    try {
      const user = await ReferenceCountries.findByPk(id)
      if (!user) {
        throw new Error('Country not found')
      }
      await user.destroy()
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
}
