import {
  DeclinationTeX,
  DistanceTeX,
  MassTeX,
  RightAscensionTeX,
} from '@/components/formatters'
import TeX from '@matejmazur/react-katex'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import 'katex/dist/katex.min.css'
import { Link } from 'react-router-dom'
import type { ListItem } from '~typings/requests'
import type { Declination, MeasurementWithUncertainty } from '~typings/structs'
import { ColumnDropdown } from './column-dropdown'

const columnHelper = createColumnHelper<ListItem>()

export const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: false,
    cell: ({ row }) => (
      <Link to={`/details/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  columnHelper.accessor('type.name', { header: 'Type', enableHiding: false }),
  {
    accessorKey: 'right_ascension',
    header: 'Right Ascension',
    enableHiding: false,
    cell: ({ row }) => {
      const ra: string | undefined = row.getValue('right_ascension')
      if (!ra) return null
      return <RightAscensionTeX rightAscension={ra} />
    },
  },
  {
    accessorKey: 'declination',
    header: 'Declination',
    enableHiding: false,
    cell: ({ row }) => {
      const declination: Declination | undefined = row.getValue('declination')
      if (!declination) return null
      return <DeclinationTeX declination={declination} />
    },
  },
  {
    accessorKey: 'distance',
    header: 'Distance',
    cell: ({ row }) => {
      const distance: MeasurementWithUncertainty | undefined =
        row.getValue('distance')
      if (!distance) return null
      return <DistanceTeX distance={distance} />
    },
  },
  columnHelper.accessor('apparent_magnitude', {
    header: 'Appt. Magnitude',
    id: 'Appt. Mag.',
  }),
  columnHelper.accessor('absolute_magnitude', {
    header: 'Abs. Magnitude',
    id: 'Abs. Mag.',
  }),
  {
    accessorKey: 'mass',
    header: 'Mass',
    cell: ({ row }) => {
      const mass: number | undefined = row.getValue('mass')
      return mass && <MassTeX mass={mass} />
    },
  },
  {
    accessorKey: 'redshift',
    header: 'Redshift',
    cell: ({ row }) => {
      const redshift: number | undefined = row.getValue('redshift')
      return redshift && <TeX>{`${redshift}`}</TeX>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ColumnDropdown id={row.original.id} name={row.original.name} />
    ),
  },
] as ColumnDef<ListItem>[]
