import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/db'

interface UserAttributes {
	id?: number
	username: string
	password: string
	token: string
	status: number
}

class Users extends Model<UserAttributes> {
	public id!: number
	public username!: string
	public password!: string
	public token!: string
	public status!: number

	public readonly createdAt!: Date
	public readonly updatedAt!: Date
}

Users.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		token: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		tableName: 'Users',
		modelName: 'Users',
		timestamps: true,
	}
)

Users.sync()

export default Users
