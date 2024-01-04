import LogOutButton from '../../components/LogOutButton'
import { useAppSelector } from '../../hooks/redux'

export default function User() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useAppSelector((store) => store.user)
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  )
}
