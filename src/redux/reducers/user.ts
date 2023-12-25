import { Reducer } from 'redux'
import { SetUser, UnsetUser } from '~typings/actions'
import { UserResponse } from '~typings/requests'

const user: Reducer<
  UserResponse | Record<string, never>,
  SetUser | UnsetUser
> = (state = {}, action) => {
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
