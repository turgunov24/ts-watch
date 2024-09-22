import { Optional, DataTypes, ModelDefined } from 'sequelize'

import { sequelize } from '../../config/db'

interface UserAttributes {
  id: number
  token: string
  status: number
  username: string
  password: string
}

const Users: ModelDefined<
  UserAttributes,
  Optional<UserAttributes, 'id'>
> = sequelize.define(
  'Users',
  {
    token: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: 'Users',
  }
)

Users.sync()

export default Users
