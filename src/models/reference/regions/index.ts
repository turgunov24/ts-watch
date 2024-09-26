// src/models/User.ts
import { Optional, DataTypes, ModelDefined } from 'sequelize'

import { sequelize } from '../../../../config/db'

interface ReferencesRegionsAttributes {
  id: number
  name: string
  countryId: number
}

const ReferencesRegions: ModelDefined<
  ReferencesRegionsAttributes,
  Optional<ReferencesRegionsAttributes, 'id'>
> = sequelize.define(
  'ReferencesRegions',
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
    countryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'ReferenceCountries',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'ReferencesRegions',
  }
)

ReferencesRegions.sync({ alter: true })

export default ReferencesRegions
