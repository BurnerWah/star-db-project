import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import LogOutButton from '../LogOutButton'
import './Nav.css'

function Nav() {
  const user = useAppSelector((store) => store.user)

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/saved">
              Saved Items
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {user.administrator && (
          <Link className="navLink" to="/add">
            Add Item
          </Link>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
        <Link className="navLink" to="/list">
          List Items
        </Link>
      </div>
    </div>
  )
}

export default Nav
