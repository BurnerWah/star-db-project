import { Action, Dispatch } from 'redux'
import { DBUser } from './tables'

export type UnsetUser = Action<'UNSET_USER'>
export interface SetUser extends Action<'SET_USER'> {
  payload: DBUser
}

export type ClearLoginError = Action<'CLEAR_LOGIN_ERROR'>
export type LoginInputError = Action<'LOGIN_INPUT_ERROR'>
export type LoginFailed = Action<'LOGIN_FAILED'>
export type LoginFailedNoCode = Action<'LOGIN_FAILED_NO_CODE'>
export type ClearRegistrationError = Action<'CLEAR_REGISTRATION_ERROR'>
export type RegistrationInputError = Action<'REGISTRATION_INPUT_ERROR'>
export type RegistrationFailed = Action<'REGISTRATION_FAILED'>

type Actions =
  | UnsetUser
  | SetUser
  | ClearLoginError
  | LoginInputError
  | LoginFailed
  | LoginFailedNoCode
  | ClearRegistrationError
  | RegistrationInputError
  | RegistrationFailed

export default Actions

export type AppDispatch = Dispatch<Actions>
