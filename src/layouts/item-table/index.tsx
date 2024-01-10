import { TypographyH2 } from '@/components/typography'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useEffect } from 'react'
import type Actions from '~typings/actions'
import { columns } from './columns'
import { DataTable } from './data-table'

export function ItemTable<A extends Actions>({
  action,
  title,
}: Readonly<{ action: A; title: string }>) {
  const dispatch = useAppDispatch()
  const listItems = useAppSelector((state) => state.listItems)

  useEffect(() => {
    dispatch(action)
  }, [action, dispatch])

  return (
    <>
      <TypographyH2>{title}</TypographyH2>
      <DataTable columns={columns} data={listItems} />
    </>
  )
}
