import { Action, Dispatch } from 'redux'
import { DeclinationInput, DistanceInput, RightAscensionInput } from './inputs'
import {
  ItemDetails,
  ListItem,
  LoginBody,
  RegisterBody,
  UserResponse,
} from './requests'
import { EDBObjectTypes } from './tables'

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
  payload: ListItem[]
}
export type UnsetListItems = Action<'LIST_ITEMS::UNSET'>

export interface SetItemDetails extends Action<'itemDetails/set'> {
  payload: ItemDetails
}
export type UnsetItemDetails = Action<'itemDetails/unset'>

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
  | SetItemDetails
  | UnsetItemDetails

export interface LoginSaga extends Action<'LOGIN'> {
  payload: LoginBody
}
export type LogoutSaga = Action<'LOGOUT'>
export interface RegisterSaga extends Action<'REGISTER'> {
  payload: RegisterBody
}
export type FetchUserSaga = Action<'FETCH_USER'>

export type FetchListItemsSaga = Action<'LIST_ITEMS::FETCH'>

export interface FetchItemDetailsSaga extends Action<'itemDetails/fetch'> {
  payload: number | string
}

export interface SaveItemSaga extends Action<'api/saveItem'> {
  payload: number | string
}

export type ListSavedItemsSaga = Action<'api/listSavedItems'>

export interface AdminDeleteItemSaga extends Action<'api/admin/deleteItem'> {
  payload: {
    id: number | string
  }
}

export interface AdminAddItemSaga extends Action<'api/admin/addItem'> {
  payload: {
    name: string
    type: EDBObjectTypes
    right_ascension?: RightAscensionInput
    declination?: DeclinationInput
    distance?: DistanceInput
    apparent_magnitude?: number
    absolute_magnitude?: number
    mass?: number
    redshift?: number
  }
}

export type SagaActions =
  | LoginSaga
  | LogoutSaga
  | RegisterSaga
  | FetchUserSaga
  | FetchListItemsSaga
  | FetchItemDetailsSaga
  | SaveItemSaga
  | ListSavedItemsSaga
  | AdminDeleteItemSaga
  | AdminAddItemSaga

type Actions = ReduxActions | SagaActions

export default Actions

export type AppDispatch = Dispatch<Actions>
