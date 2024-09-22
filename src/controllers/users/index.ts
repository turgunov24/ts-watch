import { Request, Response } from 'express'
import { pick } from 'lodash'

import { usersService } from '../../services/users.service'
import { hashPassword } from '../../utils/bcrypt'
import { generateToken } from '../../utils/jwt'

const index = async (req: Request, res: Response) => {
  try {
    const users = await usersService.index()
    res.json({ users })
  } catch {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' })
    }

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

    res.json({
      message: 'User succesfully created',
      user: pick(user.toJSON(), ['username', 'status', 'token']),
    })
  } catch {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await usersService.get(id)

    res.json(pick(user.toJSON(), ['username', 'status', 'id']))
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await usersService.update(id, req.body)

    res.json(user)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await usersService.remove(id)
    res.json({ message: 'User deleted' })
  } catch (error: unknown) {
    console.log('error', error)
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export { get, index, create, remove, update }
