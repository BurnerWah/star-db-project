import type { PaginationState } from '@tanstack/react-table'
import { combineReducers, type Reducer } from 'redux'
import type {
  ClearTablePagination,
  SetListItems,
  SetTablePagination,
  UnsetListItems,
} from '~typings/actions'

/**
 * This reducer tracks the current state of the table's pagination.
 * @see {@link https://stackoverflow.com/questions/74721400/tanstack-table-how-can-i-use-redux-action-in-onpaginationchange-instead-of-set TanStack Table | How can I use redux...}
 */
const pagination: Reducer<
  Readonly<PaginationState>,
  SetTablePagination | ClearTablePagination | SetListItems | UnsetListItems
> = (state = { pageIndex: 0, pageSize: 5 }, action) => {
  switch (action.type) {
    case 'table/pagination/set':
      return action.payload
    case 'listItems/set':
      return { ...state, pageIndex: action.payload.page }
    case 'table/pagination/clear':
    case 'listItems/unset':
      return { pageIndex: 0, pageSize: 5 }
    default:
      return state
  }
}

export default combineReducers({
  pagination,
})
