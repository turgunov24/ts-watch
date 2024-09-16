import { generateToken } from '../../utils/jwt'
import  { Request, Response } from 'express'
import Users from '../../models/users'
import bcrypt from 'bcryptjs'

export default async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			return res
				.status(400)
				.json({ message: 'Username and password are required' })
		}

		const finded = await Users.findOne({
			where: { username },
		})

		if (!finded) {
			return res.status(400).json({ message: 'User not found' })
		}

		const isValidPassword = bcrypt.compareSync(password, finded.dataValues.password)

		if (!isValidPassword) {
			return res.status(400).json({ message: 'Invalid password' })
		}

		const token = generateToken({ username: finded.username, id: finded.id })

		res.json({ token, user: finded })
	} catch (error: unknown) {
		res.status(500).json({ message: 'Internal server error' })
	}
}
