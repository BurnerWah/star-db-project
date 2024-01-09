import type { MeasurementWithUncertainty } from './structs'

export type RightAscensionInput = Readonly<{
  hours?: number
  min?: number
  sec?: number
}>

export type DeclinationInput = Readonly<{
  degrees?: number
  arcmin?: number
  arcsec?: number
}>

export type DistanceInput = Readonly<Partial<MeasurementWithUncertainty>>
