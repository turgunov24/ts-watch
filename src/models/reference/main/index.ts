// src/models/User.ts
import { Optional, DataTypes, ModelDefined } from 'sequelize'

import { sequelize } from '../../../../config/db'
import { ITypes } from './types'

interface ReferenceMainDistrictAttributes {
  regionId: number
}
interface ReferenceMainRegionAttiributes {
  countryId: number
}

interface ReferenceMainAttributes
  extends ReferenceMainDistrictAttributes,
    ReferenceMainRegionAttiributes {
  id: number
  name: string
  type: ITypes
}

const ReferenceMain: ModelDefined<
  ReferenceMainAttributes,
  Optional<ReferenceMainAttributes, 'countryId' | 'regionId' | 'id'>
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
