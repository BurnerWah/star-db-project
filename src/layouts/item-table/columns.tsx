import {
  DeclinationTeX,
  DistanceTeX,
  MassTeX,
  RightAscensionTeX,
} from '@/components/formatters'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TeX from '@matejmazur/react-katex'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import 'katex/dist/katex.min.css'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ListItem } from '~typings/requests'
import type { Declination, MeasurementWithUncertainty } from '~typings/structs'

const columnHelper = createColumnHelper<ListItem>()

export const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <Link to={`/details/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  columnHelper.accessor('type.name', { header: 'Type' }),
  {
    accessorKey: 'right_ascension',
    header: 'Right Ascension',
    cell: ({ row }) => {
      const ra: string | undefined = row.getValue('right_ascension')
      if (!ra) return null
      return <RightAscensionTeX rightAscension={ra} />
    },
  },
  {
    accessorKey: 'declination',
    header: 'Declination',
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
  columnHelper.accessor('apparent_magnitude', { header: 'Appt. Magnitude' }),
  columnHelper.accessor('absolute_magnitude', { header: 'Abs. Magnitude' }),
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link to={`/details/${row.original.id}`}>View Details</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.name)}
          >
            Copy Name
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
] as ColumnDef<ListItem>[]
