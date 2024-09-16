import jwt from 'jsonwebtoken'
import { IUser } from '../../types'

const JWT_SECRET = process.env.JWT_SECRET!

const generateToken = ({ id, username }: Pick<IUser, 'id' | 'username'>) => {
	return jwt.sign({ id, username }, JWT_SECRET, {
		expiresIn: '1m',
	})
}

export { generateToken }
