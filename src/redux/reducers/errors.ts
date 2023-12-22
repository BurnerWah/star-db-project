import {
  ClearLoginError,
  ClearRegistrationError,
  LoginFailed,
  LoginFailedNoCode,
  LoginInputError,
  RegistrationFailed,
  RegistrationInputError,
} from '@typings/actions'
import { Reducer, combineReducers } from 'redux'

/**
 * holds the string that will display on the login screen if there's an error
 */
const loginMessage: Reducer<
  string,
  ClearLoginError | LoginInputError | LoginFailed | LoginFailedNoCode
> = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return ''
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your username and password!'
    case 'LOGIN_FAILED':
      return "Oops! The username and password didn't match. Try again!"
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?'
    default:
      return state
  }
}

/**
 * holds the string that will display on the registration screen if there's an error
 */
const registrationMessage: Reducer<
  string,
  ClearRegistrationError | RegistrationInputError | RegistrationFailed
> = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return ''
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose a username and password!'
    case 'REGISTRATION_FAILED':
      return "Oops! That didn't work. The username might already be taken. Try again!"
    default:
      return state
  }
}

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
})
