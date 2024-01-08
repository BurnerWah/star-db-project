import { useAppSelector } from '@/hooks/redux'
import { Navigate } from 'react-router-dom'

export function RequireAuth({
  children,
  redirectTo = '/login',
}: Readonly<{ children: JSX.Element; redirectTo?: string }>) {
  const user = useAppSelector((store) => store.user)
  const userInitalized = useAppSelector((store) => store.status.userInitalized)
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
  const userInitalized = useAppSelector((store) => store.status.userInitalized)
  return (
    userInitalized &&
    (user.administrator ? children : <Navigate to={redirectTo} />)
  )
}
