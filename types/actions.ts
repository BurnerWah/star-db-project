import { Action, Dispatch } from 'redux'
import { LoginBody, RegisterBody, UserResponse } from './requests'
import { ParsedItem } from './structs'

export type UnsetUser = Action<'UNSET_USER'>
export interface SetUser extends Action<'SET_USER'> {
  payload: UserResponse
}

export type ClearLoginError = Action<'CLEAR_LOGIN_ERROR'>
export type LoginInputError = Action<'LOGIN_INPUT_ERROR'>
export type LoginFailed = Action<'LOGIN_FAILED'>
export type LoginFailedNoCode = Action<'LOGIN_FAILED_NO_CODE'>
export type ClearRegistrationError = Action<'CLEAR_REGISTRATION_ERROR'>
export type RegistrationInputError = Action<'REGISTRATION_INPUT_ERROR'>
export type RegistrationFailed = Action<'REGISTRATION_FAILED'>

export interface SetListItems extends Action<'LIST_ITEMS::SET'> {
  payload: ParsedItem[]
}
export type UnsetListItems = Action<'LIST_ITEMS::UNSET'>

export type ReduxActions =
  | UnsetUser
  | SetUser
  | ClearLoginError
  | LoginInputError
  | LoginFailed
  | LoginFailedNoCode
  | ClearRegistrationError
  | RegistrationInputError
  | RegistrationFailed
  | SetListItems
  | UnsetListItems

export interface LoginSaga extends Action<'LOGIN'> {
  payload: LoginBody
}
export type LogoutSaga = Action<'LOGOUT'>
export interface RegisterSaga extends Action<'REGISTER'> {
  payload: RegisterBody
}
export type FetchUserSaga = Action<'FETCH_USER'>

export type SagaActions = LoginSaga | LogoutSaga | RegisterSaga | FetchUserSaga

type Actions = ReduxActions | SagaActions

export default Actions

export type AppDispatch = Dispatch<Actions>
