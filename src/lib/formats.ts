import { DeclinationInput } from '~typings/inputs'
import { Declination } from '~typings/structs'

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
