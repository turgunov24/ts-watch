// src/models/User.ts
import { Optional, DataTypes, ModelDefined } from 'sequelize'

import { sequelize } from '../../../../config/db'

interface ReferenceCountriesAttributes {
  id: number
  name: string
}

const ReferenceCountries: ModelDefined<
  ReferenceCountriesAttributes,
  Optional<ReferenceCountriesAttributes, 'id'>
> = sequelize.define(
  'ReferenceCountries',
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
  },
  {
    timestamps: true,
    tableName: 'ReferenceCountries',
  }
) 

ReferenceCountries.sync({ alter: true })

export default ReferenceCountries
