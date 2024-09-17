import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../../config/db";

interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  token: string;
  status: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

const Users: ModelDefined<UserAttributes, UserCreationAttributes> =
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
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
      tableName: "Users",
      timestamps: true,
    }
  );

Users.sync();

export default Users;
