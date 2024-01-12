import { useAppSelector } from '@/hooks/redux'
import type { RootState } from '@/redux/store'
import { Navigate } from 'react-router-dom'

const selectUserInitialized = (store: RootState) => store.status.userInitalized

export function RequireAuth({
  children,
  redirectTo = '/login',
}: Readonly<{ children: JSX.Element; redirectTo?: string }>) {
  const user = useAppSelector((store) => store.user)
  const userInitalized = useAppSelector(selectUserInitialized)
  return userInitalized && (user.id ? children : <Navigate to={redirectTo} />)
}

export function RequireAdmin({
  children,
  redirectTo = '/login',
}: Readonly<{
  children: JSX.Element
  redirectTo?: string
}>) {
  const user = useAppSelector((store) => store.user)
  const userInitalized = useAppSelector(selectUserInitialized)
  return (
    userInitalized &&
    (user.administrator ? children : <Navigate to={redirectTo} />)
  )
}

export function RequireNotAuth({
  children,
  redirectTo = '/user',
}: Readonly<{ children: JSX.Element; redirectTo?: string }>) {
  const user = useAppSelector((store) => store.user)
  const userInitalized = useAppSelector(selectUserInitialized)
  return userInitalized && (!user.id ? children : <Navigate to={redirectTo} />)
}
