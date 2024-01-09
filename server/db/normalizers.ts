import type { z } from 'zod'
import { ServerDeclinatorSchemaPart } from '~shared/schemas.ts'
import type { Declination } from '~typings/structs.ts'

/**
 * Converts a number of arc seconds into a Declination object
 * @param declination The declination as a number of arcseconds
 * @returns The declination
 */
export function parseDeclination(declination: number): Declination {
  const sign = Math.sign(declination) as Declination['sign']
  const degrees = Math.floor(Math.abs(declination) / 3600)
  const arcmin = Math.floor(Math.abs(declination) / 60) % 60
  // This just cleans up some float awkwardness
  const arcsec = Math.floor((Math.abs(declination) % 60) * 10000) / 10000
  return { sign, degrees, arcmin, arcsec }
}

/**
 * Converts a Declination object into a number of arc seconds
 * @param declination A declination object
 * @returns A number of arcseconds
 */
export function unparseDeclination(
  declination: NonNullable<z.infer<typeof ServerDeclinatorSchemaPart>>,
): number {
  const { sign, degrees, arcmin, arcsec } = declination
  return sign * (degrees * 3600 + arcmin * 60 + arcsec)
}
