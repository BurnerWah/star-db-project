import { TypographyH2 } from '@/components/typography'
import { DataTable } from '@/components/ui/data-table'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react'
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
] as ColumnDef<ListItem>[]

export default function Saved() {
  const dispatch = useAppDispatch()
  const listItems = useAppSelector((state) => state.listItems)
  useEffect(() => {
    dispatch({ type: 'api/listSavedItems' })
  }, [dispatch])

  return (
    <div className="container">
      <TypographyH2>Listing</TypographyH2>
      <DataTable columns={columns} data={listItems} />
    </div>
  )
}
