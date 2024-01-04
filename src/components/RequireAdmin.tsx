import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

export default function RequireAdmin({
  children,
  redirectTo = '/login',
}: Readonly<{
  children: JSX.Element
  redirectTo?: string
}>) {
  const user = useAppSelector((store) => store.user)
  return user.administrator ? children : <Navigate to={redirectTo} />
}
