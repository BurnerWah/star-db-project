import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer.tsx'
import Nav from './components/Nav/Nav.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import { useAppDispatch, useAppSelector } from './hooks/redux.ts'
import AboutPage from './pages/About'
import Details from './pages/Details/index.tsx'
import InfoPage from './pages/Info'
import LandingPage from './pages/Landing'
import Listing from './pages/Listing/index.tsx'
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
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/*
            Visiting localhost:3000/about will show the about page.
            shows AboutPage at all times (logged in or not)
            */}
          <Route path="about" element={<AboutPage />} />

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

          <Route
            path="login"
            element={user.id ? <Navigate to="/user" /> : <LoginPage />}
          />

          <Route
            path="registration"
            element={user.id ? <Navigate to="/user" /> : <RegisterPage />}
          />

          <Route
            path="home"
            element={user.id ? <Navigate to="/user" /> : <LandingPage />}
          />

          <Route path="list" element={<Listing />} />
          <Route path="details/:id" element={<Details />} />

          {/* If none of the other routes matched, we will show a 404. */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
