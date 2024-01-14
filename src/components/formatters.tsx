import TeX from '@matejmazur/react-katex'
import 'katex/dist/katex.min.css'
import { memo } from 'react'
import type { Declination, MeasurementWithUncertainty } from '~typings/structs'

// This has a bunch of TeX components so that they can be reused in multiple
// places.

export const RightAscensionTeX = memo(
  ({ rightAscension }: Readonly<{ rightAscension: string }>) => {
    const [hours, minutes, seconds] = rightAscension.split(':')
    return <TeX>{`${hours}^h ${minutes}^m ${seconds}^s`}</TeX>
  },
)
RightAscensionTeX.displayName = 'RightAscensionTeX'

export const DeclinationTeX = memo(
  ({ declination }: Readonly<{ declination: Declination }>) => {
    const { sign, degrees, arcmin, arcsec } = declination
    return <TeX>{`${sign * degrees}\\degree ${arcmin}' ${arcsec}"`}</TeX>
  },
)
DeclinationTeX.displayName = 'DeclinationTeX'

export const DistanceTeX = memo(
  ({ distance }: Readonly<{ distance: MeasurementWithUncertainty }>) => {
    const { value, error } = distance
    return <TeX>{`${value}±${error} \\text{ ly}`}</TeX>
  },
)
DistanceTeX.displayName = 'DistanceTeX'

export const MassTeX = memo(({ mass }: Readonly<{ mass: number }>) => (
  <TeX>{`${mass} \\ M_\\odot`}</TeX>
))
MassTeX.displayName = 'MassTeX'
