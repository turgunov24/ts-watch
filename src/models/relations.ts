import ReferenceCountries from './reference/countries'
import ReferencesRegions from './reference/regions'

const init = async () => {
  try {
    ReferenceCountries.hasMany(ReferencesRegions, { foreignKey: 'countryId' })
    ReferencesRegions.belongsTo(ReferenceCountries, { foreignKey: 'countryId' })
  } catch (error: unknown) {
    console.log('error while initializing relations', error)
  }
}

init()
