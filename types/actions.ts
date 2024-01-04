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

export type UnsetUser = Action<'user/unset'>
export interface SetUser extends Action<'user/set'> {
  payload: UserResponse
}

export type ClearLoginError = Action<'errors/login/clear'>
export type LoginInputError = Action<'errors/login/input'>
export type LoginFailed = Action<'errors/login/fail'>
export type LoginFailedNoCode = Action<'errors/login/failNoCode'>
export type ClearRegistrationError = Action<'errors/registration/clear'>
export type RegistrationInputError = Action<'errors/registration/input'>
export type RegistrationFailed = Action<'errors/registration/fail'>

export interface SetListItems extends Action<'listItems/set'> {
  payload: ListItem[]
}
export type UnsetListItems = Action<'listItems/unset'>

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

export interface LoginSaga extends Action<'api/auth/login'> {
  payload: LoginBody
}
export type LogoutSaga = Action<'api/auth/logout'>
export interface RegisterSaga extends Action<'api/auth/register'> {
  payload: RegisterBody
}
export type FetchUserSaga = Action<'user/fetch'>

export type FetchListItemsSaga = Action<'listItems/fetch'>

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
    nasa_image_id?: string
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
