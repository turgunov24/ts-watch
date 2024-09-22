/* eslint-disable no-useless-catch */
import Users from '../models/users'

export const usersService = {
  async index() {
    try {
      return await Users.findAll()
    } catch (error: unknown) {
      throw error
    }
  },
  async create(user: { token: string; username: string; password: string }) {
    try {
      return await Users.create({ ...user, status: 1 })
    } catch (error: unknown) {
      throw error
    }
  },
  async update(id: string, data: any) {
    try {
      if (!id) {
        throw new Error('Id not provided')
      }

      const user = await Users.findByPk(id)

      if (!user) {
        throw new Error('User not found')
      }

      await user.update(data)

      return user
    } catch (error: unknown) {
      throw error
    }
  },
  async remove(id: string) {
    try {
      if (!id) {
        throw new Error('Id not provided')
      }

      const user = await Users.findByPk(id)

      if (!user) {
        throw new Error('User not found')
      }

      await user.destroy()
    } catch (error: unknown) {
      throw error
    }
  },
  async get(id: string) {
    try {
      if (!id) {
        throw new Error('Id not provided')
      }

      const user = await Users.findByPk(id)

      if (!user) {
        throw new Error('User not found')
      }

      return user
    } catch (error: unknown) {
      throw error
    }
  },
}
