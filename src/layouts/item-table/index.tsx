import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
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
  const pageCount = useAppSelector((state) => state.listItems.pageCount ?? -1)
  const pagination = useAppSelector((state) => state.table.pagination)

  const actionType = action.type

  const table = useReactTable({
    data: listItems.items,
    columns,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      const nextState = (updater as (old: PaginationState) => PaginationState)(
        pagination,
      )
      dispatch({
        type: actionType,
        payload: { page: nextState.pageIndex },
      } as A)
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: import.meta.env.DEV,
  })

  useEffect(() => {
    dispatch(action)
  }, [action, dispatch])

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {title && <TableTitle>{title}</TableTitle>}
      {listItems.items && (
        <DirectDataTable table={table} columns={columns} pagination />
      )}
    </div>
  )
}

function TableTitle({ children }: Readonly<{ children: ReactNode }>) {
  return <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
}
