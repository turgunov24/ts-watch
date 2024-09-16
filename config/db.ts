import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
	dialect: 'postgres',
	password: '123456',
	username: 'postgres',
	database: 'testdb',
	host: 'localhost',
	port: 5432,
})

const dbConnect = async () => {
	try {
		await sequelize.authenticate()
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}

export { dbConnect, sequelize }
