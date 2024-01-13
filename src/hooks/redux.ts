import { useDispatch, useSelector } from 'react-redux'
import { put as originalPut, type PutEffect } from 'redux-saga/effects'
import type { default as Actions, AppDispatch } from '~typings/actions'
import type { RootState } from '../redux/store'

// See https://redux.js.org/usage/usage-with-typescript#define-typed-hooks

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// typed version of put
type PutFunc<A extends Actions = Actions> = (action: A) => PutEffect<A>
export const put: PutFunc = originalPut
