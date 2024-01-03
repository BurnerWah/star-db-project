import { Reducer } from 'redux'
import { SetListItems, UnsetListItems } from '~typings/actions'
import { ParsedItem } from '~typings/structs'

const listItems: Reducer<
  ReadonlyArray<ParsedItem>,
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
