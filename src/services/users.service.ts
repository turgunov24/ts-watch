import Users from '../models/users'

export const usersService = {
  index: async () => await Users.findAll(),
  create: async (user: { token: string; username: string; password: string }) =>
    await Users.create({ ...user, status: 1 }),

  update: async (id: string, data: any) => {
    const user = await Users.findByPk(id)

    if (!user) {
      throw new Error('User not found')
    }

    await user.update(data)

    return user
  },
  remove: async (id: string) => {
    const user = await Users.findByPk(id)

    if (!user) {
      throw new Error('User not found')
    }

    await user.destroy()
  },
  get: async (id: string) => {
    const user = await Users.findByPk(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  },
}
