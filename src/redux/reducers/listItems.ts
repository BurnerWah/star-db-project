import { Reducer } from 'redux'
import { SetListItems, UnsetListItems } from '~typings/actions'
import { ListItem } from '~typings/requests'

const listItems: Reducer<
  ReadonlyArray<ListItem>,
  SetListItems | UnsetListItems
> = (state = [], action) => {
  switch (action.type) {
    case 'LIST_ITEMS::SET':
      return action.payload
    case 'LIST_ITEMS::UNSET':
      return []
    default:
      return state
  }
}

export default listItems
