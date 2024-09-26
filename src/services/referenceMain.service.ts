import { DatabaseError } from 'sequelize'

import ReferenceMain from '../models/reference/main'

export const referenceMainService = {
  index: async (type: string) => {
    try {
      const references = await ReferenceMain.findAll({ where: { type } })
      return references
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  get: async (id: string) => {
    try {
      const user = await ReferenceMain.findByPk(id)

      if (!user) {
        throw new Error('User not found')
      }

      return user
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  create: async (type: string, data: any) => {
    try {
      const user = await ReferenceMain.create({ ...data, type })
      return user
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  update: async (id: string, data: any) => {
    try {
      const user = await ReferenceMain.findByPk(id)

      if (!user) {
        throw new Error('user not found')
      }
      await user.update(data)

      return user
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
  remove: async (id: string) => {
    try {
      const user = await ReferenceMain.findByPk(id)
      if (!user) {
        throw new Error('user not found')
      }
      await user.destroy()
    } catch (error: unknown) {
      if (error instanceof DatabaseError) throw new Error(error.message)
      throw error
    }
  },
}
