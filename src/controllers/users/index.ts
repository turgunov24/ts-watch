import { Request, Response } from 'express'
import { pick } from 'lodash'

import { usersService } from '../../services/users.service'
import { hashPassword } from '../../utils/bcrypt'
import { generateToken } from '../../utils/jwt'

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    if (id) {
      const user = await usersService.get(id as string)
      res.json(pick(user.toJSON(), ['username', 'status', 'id']))
    } else {
      const users = await usersService.index()
      res.json({ users })
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    res.status(500).json({ message: 'Internal server error' })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const hashedPassword = await hashPassword(password)

    const token = generateToken({
      username,
      password,
    })

    const user = await usersService.create({
      token,
      username,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'User succesfully created',
      user: pick(user.toJSON(), ['username', 'status', 'token']),
    })
  } catch {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    const user = await usersService.update(id as string, req.body)

    res.json(user)
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    res.status(500).json({ message: 'Internal server error' })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    await usersService.remove(id as string)
    res.json({ message: 'User deleted' })
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message })

    res.status(500).json({ message: 'Internal server error' })
  }
}

export { get, create, remove, update }
