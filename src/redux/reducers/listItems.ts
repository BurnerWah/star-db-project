import type { Reducer } from 'redux'
import type { SetListItems, UnsetListItems } from '~typings/actions'
import type { ListingResponse } from '~typings/requests'

const listItems: Reducer<
  ListingResponse | Record<string, never>,
  SetListItems | UnsetListItems
> = (state = {}, action) => {
  switch (action.type) {
    case 'listItems/set':
      return action.payload
    case 'listItems/unset':
      return {}
    default:
      return state
  }
}

export default listItems
