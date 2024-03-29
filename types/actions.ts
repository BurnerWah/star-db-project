import type { PaginationState } from '@tanstack/react-table'
import type { Action, Dispatch } from 'redux'
import type { ZObjectType } from '~shared/schemas'
import type {
  DeclinationInput,
  DistanceInput,
  RightAscensionInput,
} from './inputs'
import type {
  ItemDetails,
  ListingResponse,
  LoginBody,
  RegisterBody,
  UserResponse,
} from './requests'

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
  payload: ListingResponse
}
export type UnsetListItems = Action<'listItems/unset'>

export interface SetItemDetails extends Action<'itemDetails/set'> {
  payload: ItemDetails
}
export type UnsetItemDetails = Action<'itemDetails/unset'>

export type SetUserInitialized = Action<'status/userInitalized'>

export type ShowHeader = Action<'ui/header/show'>
export type HideHeader = Action<'ui/header/hide'>
export type ShowFooter = Action<'ui/footer/show'>
export type HideFooter = Action<'ui/footer/hide'>

export interface SetTablePagination extends Action<'table/pagination/set'> {
  payload: PaginationState
}
export type ClearTablePagination = Action<'table/pagination/clear'>

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
  | SetUserInitialized
  | ShowHeader
  | HideHeader
  | ShowFooter
  | HideFooter
  | SetTablePagination

export interface LoginSaga extends Action<'api/auth/login'> {
  payload: LoginBody
}
export type LogoutSaga = Action<'api/auth/logout'>
export interface RegisterSaga extends Action<'api/auth/register'> {
  payload: RegisterBody
}
export type FetchUserSaga = Action<'user/fetch'>

export interface ListingFetcher<T extends string> extends Action<T> {
  payload?: {
    search?: string
    page?: number
    page_size?: number
  }
}

export type FetchListItemsSaga = ListingFetcher<'listItems/fetch'>

export interface FetchItemDetailsSaga extends Action<'itemDetails/fetch'> {
  payload: number | string
}

export interface SaveItemSaga extends Action<'api/saveItem'> {
  payload: number
}

export interface UnsaveItemSaga extends Action<'api/unsaveItem'> {
  payload: number
}

export type ListSavedItemsSaga = ListingFetcher<'api/listSavedItems'>

export interface AdminDeleteItemSaga extends Action<'api/admin/deleteItem'> {
  payload: {
    id: number | string
  }
}

export interface AdminAddItemSaga extends Action<'api/admin/addItem'> {
  payload: {
    name: string
    type: ZObjectType
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
  | UnsaveItemSaga
  | ListSavedItemsSaga
  | AdminDeleteItemSaga
  | AdminAddItemSaga

type Actions = ReduxActions | SagaActions

export default Actions

export type AppDispatch = Dispatch<Actions>
