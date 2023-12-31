import { combineReducers, type Reducer } from 'redux'
import type {
  ClearLoginError,
  ClearRegistrationError,
  LoginFailed,
  LoginFailedNoCode,
  LoginInputError,
  RegistrationFailed,
  RegistrationInputError,
} from '~typings/actions'

// Enum has to be exported for barrel file to work
export enum LoginMessages {
  NONE = '',
  INPUT_ERROR = 'Enter your username and password!',
  FAILED = "Oops! The username and password didn't match. Try again!",
  FAILED_NO_CODE = 'Oops! Something went wrong! Is the server running?',
}

/**
 * holds the string that will display on the login screen if there's an error
 */
const loginMessage: Reducer<
  Readonly<LoginMessages>,
  ClearLoginError | LoginInputError | LoginFailed | LoginFailedNoCode
> = (state = LoginMessages.NONE, action) => {
  switch (action.type) {
    case 'errors/login/clear':
      return LoginMessages.NONE
    case 'errors/login/input':
      return LoginMessages.INPUT_ERROR
    case 'errors/login/fail':
      return LoginMessages.FAILED
    case 'errors/login/failNoCode':
      return LoginMessages.FAILED_NO_CODE
    default:
      return state
  }
}

// Enum has to be exported for barrel file to work
export enum RegistrationMessages {
  NONE = '',
  INPUT_ERROR = 'Choose a username and password!',
  FAILED = "Oops! That didn't work. The username might already be taken. Try again!",
}

/**
 * holds the string that will display on the registration screen if there's an error
 */
const registrationMessage: Reducer<
  Readonly<RegistrationMessages>,
  ClearRegistrationError | RegistrationInputError | RegistrationFailed
> = (state = RegistrationMessages.NONE, action) => {
  switch (action.type) {
    case 'errors/registration/clear':
      return RegistrationMessages.NONE
    case 'errors/registration/input':
      return RegistrationMessages.INPUT_ERROR
    case 'errors/registration/fail':
      return RegistrationMessages.FAILED
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
