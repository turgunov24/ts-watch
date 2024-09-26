import { DatabaseError } from 'sequelize'

import ReferencesDistricts from '../../models/reference/districts'

export const referencesDistrictsService = {
  index: async () => {
    try {
      const references = await ReferencesDistricts.findAll()
      return references
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  create: async (data: any) => {
    try {
      const country = await ReferencesDistricts.create(data)
      return country
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  update: async (id: string, data: any) => {
    try {
      const user = await ReferencesDistricts.findByPk(id)

      if (!user) {
        throw new Error('District not found')
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
      const user = await ReferencesDistricts.findByPk(id)

      if (!user) {
        throw new Error('District not found')
      }

      return user
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  remove: async (id: string) => {
    try {
      const user = await ReferencesDistricts.findByPk(id)
      if (!user) {
        throw new Error('District not found')
      }
      await user.destroy()
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
}
