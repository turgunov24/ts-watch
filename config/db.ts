import { Options, Sequelize } from 'sequelize'

const env = process.env.NODE_ENV || 'development'

const config: Record<string, Options> = {
  production: {
    port: 0,
    password: '',
    username: 'root',
    dialect: 'mysql',
    host: '127.0.0.1',
    database: 'database_production',
  },
  development: {
    port: 5432,
    host: '127.0.0.1',
    password: '123456',
    database: 'testdb',
    dialect: 'postgres',
    username: 'postgres',
    logging: false,
  },
}

const sequelize = new Sequelize(config[env])

const connect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { connect, sequelize }
