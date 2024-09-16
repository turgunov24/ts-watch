import bcrypt from 'bcryptjs'

const saltRounds = 10

async function hashPassword(plainPassword: string): Promise<string> {
	const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)
	return hashedPassword
}

export { hashPassword }
