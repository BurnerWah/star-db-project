import { Reducer } from 'redux'
import { SetItemDetails, UnsetItemDetails } from '~typings/actions'
import { ItemDetails } from '~typings/requests'

const itemDetails: Reducer<
  Readonly<ItemDetails | Record<string, never>>,
  SetItemDetails | UnsetItemDetails
> = (state = {}, action) => {
  switch (action.type) {
    case 'itemDetails/set':
      return action.payload
    case 'itemDetails/unset':
      return {}
    default:
      return state
  }
}

export default itemDetails
