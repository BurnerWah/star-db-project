import { RequireAuth } from '@/components/auth'
import { TypographyH2 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

export default function User() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((store) => store.user)

  return (
    <div>
      <TypographyH2>Welcome, {user.username}!</TypographyH2>
      <p>Your ID is: {user.id}</p>
      <Button onClick={() => dispatch({ type: 'api/auth/logout' })}>
        Log Out
      </Button>
    </div>
  )
}

export function Component() {
  return (
    <RequireAuth>
      <User />
    </RequireAuth>
  )
}
