import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

export default function RequireAuth({
  children,
  redirectTo = '/login',
}: Readonly<{
  children: JSX.Element
  redirectTo?: string
}>) {
  const user = useAppSelector((store) => store.user)
  const userInitalized = useAppSelector((store) => store.status.userInitalized)
  return userInitalized && (user.id ? children : <Navigate to={redirectTo} />)
}
