import { Redirect } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

export default function RequireAuth({
  children,
  redirectTo = '/login',
}: Readonly<{
  children: JSX.Element
  redirectTo?: string
}>) {
  const user = useAppSelector((store) => store.user)
  return user.id ? children : <Redirect to={redirectTo} />
}
