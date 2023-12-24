import { SetUser, UnsetUser } from '@typings/actions'
import { DBUser } from '@typings/tables'
import { Reducer } from 'redux'

const user: Reducer<DBUser | Record<string, never>, SetUser | UnsetUser> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'UNSET_USER':
      return {}
    default:
      return state
  }
}

// user will be on the redux state at:
// state.user
export default user
