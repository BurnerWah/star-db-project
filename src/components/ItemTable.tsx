import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Actions from '~typings/actions'
import { type ListItem } from '~typings/requests'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

const columnHelper = createColumnHelper<ListItem>()

const columns = [
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('type.name', { header: 'Type' }),
  columnHelper.accessor('right_ascension', { header: 'Right Ascension' }),
  columnHelper.accessor(
    ({ declination }) =>
      declination &&
      `${
        declination?.sign * declination?.degrees
      }° ${declination?.arcmin}' ${declination?.arcsec}"`,
    { header: 'Declination' },
  ),
  columnHelper.accessor(
    ({ distance }) => distance && `${distance.value}±${distance.error} Ly`,
    { header: 'Distance' },
  ),
  columnHelper.group({
    header: 'Magnitude',
    columns: [
      columnHelper.accessor('apparent_magnitude', { header: 'Apparent' }),
      columnHelper.accessor('absolute_magnitude', { header: 'Absolute' }),
    ],
  }),
  columnHelper.accessor('mass', { header: 'Mass' }),
  columnHelper.accessor('redshift', { header: 'Redshift' }),
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

export default function ItemTable<A extends Actions>({
  action,
}: Readonly<{ action: A }>) {
  const dispatch = useAppDispatch()
  const listItems = useAppSelector((state) => state.listItems)

  useEffect(() => {
    dispatch(action)
  }, [action, dispatch])

  return <DataTable columns={columns} data={listItems} />
}
