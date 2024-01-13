import { useAppSelector } from '@/hooks/redux'
import { selectAdministrator, selectLoggedIn } from '@/redux/selectors'
import type { RootState } from '@/redux/store'
import type { ComponentProps, ReactNode } from 'react'
import { Navigate, type To } from 'react-router-dom'

type AuthProps = Readonly<
  Omit<ComponentProps<typeof Navigate>, 'to'> & {
    to?: To
    children: ReactNode
  }
>

const selectUserInitialized = (store: RootState) => store.status.userInitalized

export function RequireAuth({ children, to = '/login', ...props }: AuthProps) {
  const initalized = useAppSelector(selectUserInitialized)
  const loggedIn = useAppSelector(selectLoggedIn)

  return initalized && (loggedIn ? children : <Navigate to={to} {...props} />)
}

export function RequireAdmin({ children, to = '/login', ...props }: AuthProps) {
  const initalized = useAppSelector(selectUserInitialized)
  const isAdmin = useAppSelector(selectAdministrator)

  return initalized && (isAdmin ? children : <Navigate to={to} {...props} />)
}

export function RequireNotAuth({
  children,
  to = '/user',
  ...props
}: AuthProps) {
  const initalized = useAppSelector(selectUserInitialized)
  const loggedIn = useAppSelector(selectLoggedIn)

  return initalized && (loggedIn ? <Navigate to={to} {...props} /> : children)
}
