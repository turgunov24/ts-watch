import ReferenceMain from '../models/reference/main'

export const referenceMainService = {
  index: async (type: string) =>
    await ReferenceMain.findAll({ where: { type } }),
  get: async (id: string) => {
    const user = await ReferenceMain.findByPk(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  },
}
