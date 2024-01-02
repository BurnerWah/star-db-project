import { useEffect } from 'react'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer.tsx'
import Nav from './components/Nav/Nav.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import { useAppDispatch, useAppSelector } from './hooks/redux.ts'
import AboutPage from './pages/About'
import InfoPage from './pages/Info'
import LandingPage from './pages/Landing'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import UserPage from './pages/User'

function App() {
  const dispatch = useAppDispatch()

  const user = useAppSelector((store) => store.user)

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' })
  }, [dispatch])

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/*
            Visiting localhost:3000/about will show the about page.
            shows AboutPage at all times (logged in or not)
            */}
          <Route path="about">
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <Route
            path="user"
            element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }
          />

          <Route
            path="info"
            element={
              <RequireAuth>
                <InfoPage />
              </RequireAuth>
            }
          />

          <Route path="login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Navigate to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route path="registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Navigate to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route path="home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Navigate to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
