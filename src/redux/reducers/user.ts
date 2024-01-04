import { Reducer } from 'redux'
import { SetUser, UnsetUser } from '~typings/actions'
import { UserResponse } from '~typings/requests'

const user: Reducer<
  Readonly<UserResponse | Record<string, never>>,
  SetUser | UnsetUser
> = (state = {}, action) => {
  switch (action.type) {
    case 'user/set':
      return action.payload
    case 'user/unset':
      return {}
    default:
      return state
  }
}

// user will be on the redux state at:
// state.user
export default user
