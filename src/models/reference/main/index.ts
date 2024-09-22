// src/models/User.ts
import { Optional, DataTypes, ModelDefined } from 'sequelize'

import { sequelize } from '../../../../config/db'

enum ITypes {
  country = 1,
  region = 2,
  district = 3,
}

interface ReferenceMainDistrictAttributes {
  regionId?: number
}
interface ReferenceMainRegionAttiributes {
  countryId?: number
}

interface ReferenceMainAttributes
  extends ReferenceMainDistrictAttributes,
    ReferenceMainRegionAttiributes {
  id: number
  name: string
  type: ITypes
}

interface ReferenceMainCreationAttributes
  extends Optional<ReferenceMainAttributes, 'countryId' | 'regionId' | 'id'> {}

const ReferenceMain: ModelDefined<
  ReferenceMainAttributes,
  ReferenceMainCreationAttributes
> = sequelize.define(
  'ReferenceMain',
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    regionId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    countryId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: 'ReferenceMain',
  }
)

ReferenceMain.sync({ alter: true })

export default ReferenceMain
