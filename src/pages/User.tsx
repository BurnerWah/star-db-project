import { RequireAuth } from '@/components/auth'
import { TypographyH2 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

export default function User() {
  const dispatch = useAppDispatch()

  const username = useAppSelector((store) => store.user.username)

  return (
    <div className="container mt-8">
      <TypographyH2>Welcome, {username}!</TypographyH2>
      <div className="mt-2 flex items-center space-x-2">
        <Button variant="default" asChild>
          <Link to="/saved">Saved Items</Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => dispatch({ type: 'api/auth/logout' })}
        >
          Log Out
        </Button>
      </div>
    </div>
  )
}

export const Component = () => (
  <RequireAuth>
    <User />
  </RequireAuth>
)

Component.displayName = 'LazyUser'
