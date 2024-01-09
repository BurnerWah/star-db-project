import { combineReducers, type Reducer } from 'redux'
import type { SetUserInitialized } from '~typings/actions'

/**
 * A reducer that says whether the user has been initialized.
 * It's useful for lazy-loading pages.
 */
const userInitalized: Reducer<Readonly<boolean>, SetUserInitialized> = (
  state = false,
  action,
) => {
  switch (action.type) {
    case 'status/userInitalized':
      return true
    default:
      return state
  }
}

export default combineReducers({
  userInitalized,
})
