import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  getCoreRowModel,
  useReactTable,
  type PaginationState,
  type VisibilityState,
} from '@tanstack/react-table'
import { Search } from 'lucide-react'
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEventHandler,
  type ReactNode,
  type SetStateAction,
} from 'react'
import type { FetchListItemsSaga, ListSavedItemsSaga } from '~typings/actions'
import { columns } from './columns'
import { DirectDataTable } from './data-table'

export function ItemTable<A extends FetchListItemsSaga | ListSavedItemsSaga>({
  action,
  title,
}: Readonly<{ action: A; title?: string }>) {
  const dispatch = useAppDispatch()
  const actionType = action.type

  const listItems = useAppSelector((state) => state.listItems)
  const pageCount = useAppSelector((state) => state.listItems.pageCount)
  const pagination = useAppSelector((state) => state.table.pagination)

  const [search, setSearch] = useState('')

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data: listItems.items,
    columns,
    pageCount,
    state: {
      pagination,
      columnVisibility,
    },
    onPaginationChange: (updater) => {
      const nextState = (updater as (old: PaginationState) => PaginationState)(
        pagination,
      )
      dispatch({
        type: actionType,
        payload: {
          page: nextState.pageIndex,
          page_size: nextState.pageSize,
          search,
        },
      } as A)
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: import.meta.env.DEV,
  })

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    dispatch({
      type: actionType,
      payload: { search },
    } as A)
  }

  useEffect(() => {
    dispatch(action)
  }, [action, dispatch])

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {title && <TableTitle>{title}</TableTitle>}
      {listItems.items && (
        <DirectDataTable
          table={table}
          columns={columns}
          pagination
          viewOptions
          search={
            <TableSearch state={[search, setSearch]} handler={handleSearch} />
          }
        />
      )}
    </div>
  )
}

function TableTitle({ children }: Readonly<{ children: ReactNode }>) {
  return <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
}

function TableSearch({
  state: [state, setState],
  handler,
}: Readonly<{
  state: [string, Dispatch<SetStateAction<string>>]
  handler: FormEventHandler<HTMLFormElement>
}>) {
  return (
    <form onSubmit={handler} className="flex items-center space-x-2 py-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ..."
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="max-w-sm pl-8"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
