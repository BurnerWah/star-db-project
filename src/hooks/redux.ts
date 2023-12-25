import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { PutEffect, put as originalPut } from 'redux-saga/effects'
import Actions, { AppDispatch } from '~typings/actions'
import type { RootState } from '../redux/store'

// See https://redux.js.org/usage/usage-with-typescript#define-typed-hooks

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// typed version of put
type PutFunc<A extends Actions = Actions> = (action: A) => PutEffect<A>
export const put: PutFunc = originalPut
