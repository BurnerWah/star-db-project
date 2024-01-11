import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, type ReactNode } from 'react'
import type { FetchListItemsSaga, ListSavedItemsSaga } from '~typings/actions'
import { columns } from './columns'
import { DirectDataTable } from './data-table'

export function ItemTable<A extends FetchListItemsSaga | ListSavedItemsSaga>({
  action,
  title,
}: Readonly<{ action: A; title?: string }>) {
  const dispatch = useAppDispatch()
  const listItems = useAppSelector((state) => state.listItems)

  const table = useReactTable({
    data: listItems.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    dispatch(action)
  }, [action, dispatch])

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {title && <TableTitle>{title}</TableTitle>}
      {listItems.items && <DirectDataTable table={table} columns={columns} />}
    </div>
  )
}

function TableTitle({ children }: Readonly<{ children: ReactNode }>) {
  return <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
}
