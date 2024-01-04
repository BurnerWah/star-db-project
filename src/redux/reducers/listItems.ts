import { Reducer } from 'redux'
import { SetListItems, UnsetListItems } from '~typings/actions'
import { ListItem } from '~typings/requests'

const listItems: Reducer<
  ReadonlyArray<ListItem>,
  SetListItems | UnsetListItems
> = (state = [], action) => {
  switch (action.type) {
    case 'listItems/set':
      return action.payload
    case 'listItems/unset':
      return []
    default:
      return state
  }
}

export default listItems
