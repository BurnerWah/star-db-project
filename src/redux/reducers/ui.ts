import { combineReducers, type Reducer } from 'redux'
import type {
  HideFooter,
  HideHeader,
  ShowFooter,
  ShowHeader,
} from '~typings/actions'

/**
 * Specifies whether the header should be shown.
 */
const showHeader: Reducer<Readonly<boolean>, ShowHeader | HideHeader> = (
  state = true,
  action,
) => {
  switch (action.type) {
    case 'ui/header/show':
      return true
    case 'ui/header/hide':
      return false
    default:
      return state
  }
}

/**
 * Specifies whether the footer should be shown
 */
const showFooter: Reducer<Readonly<boolean>, ShowFooter | HideFooter> = (
  state = true,
  action,
) => {
  switch (action.type) {
    case 'ui/footer/show':
      return true
    case 'ui/footer/hide':
      return false
    default:
      return state
  }
}

export default combineReducers({
  showHeader,
  showFooter,
})
