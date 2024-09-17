// src/models/User.ts
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../../../../config/db";

enum ITypes {
  country = 1,
  region = 2,
  district = 3,
}

interface ReferenceMainAttributes {
  id: number;
  name: string;
  type: ITypes;
}

interface ReferenceMainCreationAttributes
  extends Optional<ReferenceMainAttributes, "id"> {}

const ReferenceMain: ModelDefined<
  ReferenceMainAttributes,
  ReferenceMainCreationAttributes
> = sequelize.define(
  "ReferenceMain",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "ReferenceMain",
    timestamps: true,
  }
);

ReferenceMain.sync();

export default ReferenceMain;
