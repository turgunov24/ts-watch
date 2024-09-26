import { DatabaseError } from 'sequelize'

import ReferencesRegions from '../../models/reference/regions'

export const referencesRegionsService = {
  index: async () => {
    try {
      const references = await ReferencesRegions.findAll()
      return references
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  create: async (data: any) => {
    try {
      const country = await ReferencesRegions.create(data)
      return country
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  update: async (id: string, data: any) => {
    try {
      const user = await ReferencesRegions.findByPk(id)

      if (!user) {
        throw new Error('Regions not found')
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
      const user = await ReferencesRegions.findByPk(id)

      if (!user) {
        throw new Error('Region not found')
      }

      return user
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  remove: async (id: string) => {
    try {
      const user = await ReferencesRegions.findByPk(id)
      if (!user) {
        throw new Error('Region not found')
      }
      await user.destroy()
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
}
