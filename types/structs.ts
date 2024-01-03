import { DBObject, DBObjectType } from './tables'

export interface Declination {
  sign: -1 | 0 | 1
  degrees: number
  arcmin: number
  arcsec: number
}

export interface MeasurementWithUncertainty {
  value: number
  error: number
}

export interface ParsedItem {
  id: DBObject['id']
  name: DBObject['name']
  type: DBObjectType
  right_ascension?: DBObject['right_ascension']
  declination?: Declination | undefined
  distance?: MeasurementWithUncertainty | undefined
  apparent_magnitude?: DBObject['apparent_magnitude']
  absolute_magnitude?: DBObject['absolute_magnitude']
  mass?: DBObject['mass']
  redshift?: DBObject['redshift']
}
