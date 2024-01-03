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
