// src/models/User.ts
import { Optional, DataTypes, ModelDefined } from 'sequelize'

import { sequelize } from '../../../../config/db'

interface ReferenceDistrictsAttributes {
  id: number
  name: string
  regionId:number
}

const ReferenceDistricts: ModelDefined<
  ReferenceDistrictsAttributes,
  Optional<ReferenceDistrictsAttributes, 'id'>
> = sequelize.define(
  'ReferenceDistricts',
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    regionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'ReferencesRegions',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'ReferenceDistricts',
  }
)

ReferenceDistricts.sync({ alter: true })

export default ReferenceDistricts
