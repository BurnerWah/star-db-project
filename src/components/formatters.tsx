import TeX from '@matejmazur/react-katex'
import { Declination, MeasurementWithUncertainty } from '~typings/structs'

// This has a bunch of TeX components so that they can be reused in multiple
// places.

export function RightAscensionTeX({
  rightAscension,
}: Readonly<{ rightAscension: string }>) {
  const [hours, minutes, seconds] = rightAscension.split(':')
  return <TeX>{`${hours}^h ${minutes}^m ${seconds}^s`}</TeX>
}

export function DeclinationTeX({
  declination,
}: Readonly<{ declination: Declination }>) {
  const { sign, degrees, arcmin, arcsec } = declination
  return <TeX>{`${sign * degrees}\\degree ${arcmin}' ${arcsec}"`}</TeX>
}

export function DistanceTeX({
  distance,
}: Readonly<{ distance: MeasurementWithUncertainty }>) {
  const { value, error } = distance
  return <TeX>{`${value}±${error} \\text{ ly}`}</TeX>
}

export function MassTeX({ mass }: Readonly<{ mass: number }>) {
  return <TeX>{`${mass} \\ M_\\odot`}</TeX>
}
