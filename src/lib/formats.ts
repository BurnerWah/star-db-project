import { ZObjectType } from '~shared/schemas'
import {
  DeclinationInput,
  DistanceInput,
  RightAscensionInput,
} from '~typings/inputs'
import { Declination, MeasurementWithUncertainty } from '~typings/structs'
import { EDBObjectTypes } from '~typings/tables'

export function prepareDeclination(
  input?: DeclinationInput,
): Declination | undefined {
  // If there's no input, return undefined
  if (!input) {
    return undefined
  }
  // Degrees must be set, but everything else can be null
  if (!input.degrees) {
    return undefined
  }
  return {
    sign: Math.sign(input.degrees) as Declination['sign'],
    degrees: Math.abs(input.degrees),
    arcmin: input.arcmin || 0,
    arcsec: input.arcsec || 0,
  }
}

export function prepareRightAscension(
  input?: RightAscensionInput,
): string | undefined {
  if (!input) {
    return undefined
  }
  // At least one thing should be set
  if (!input.hours && !input.min && !input.sec) {
    return undefined
  }
  // Ideally I'd use a date object or something here, but I think this might
  // actually be simpler thanks to the JS date limitations
  const hours = `${input.hours ?? 0}`.padStart(2, '0')
  const min = `${input.min ?? 0}`.padStart(2, '0')
  // TODO: Add support for decimal seconds (input can't handle it yet)
  const sec = `${input.sec ?? 0}`.padStart(2, '0')
  return `${hours}:${min}:${sec}`
}

export function prepareDistance(
  input?: DistanceInput,
): MeasurementWithUncertainty | undefined {
  // Just a type guard
  if (!input || !input.value || !input.error) {
    return undefined
  }
  return input as MeasurementWithUncertainty
}

export function prepareObjectType(input: ZObjectType): EDBObjectTypes {
  switch (input) {
    case 'Star':
      return EDBObjectTypes.Star
    case 'Planet':
      return EDBObjectTypes.Planet
    case 'Galaxy':
      return EDBObjectTypes.Galaxy
    case 'Nebula':
      return EDBObjectTypes.Nebula
    case 'Cluster':
      return EDBObjectTypes.Cluster
    case 'Black Hole':
      return EDBObjectTypes['Black Hole']
  }
}
