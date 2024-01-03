import { useEffect } from 'react'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import { useAppDispatch, useAppSelector } from './hooks/redux.ts'
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

  // Some routes are lazy-loaded, some are not. Eventually I'd like all of them
  // to be lazy-loaded, but anything that requires auth can break if I do that.
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* redirect index to home */}
        <Route index element={<Navigate to="/home" />} />
        <Route path="about" lazy={() => import('./pages/About')} />
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
        <Route path="list" lazy={() => import('./pages/Listing')} />
        <Route path="details/:id" lazy={() => import('./pages/Details')} />
        {/* If none of the other routes matched, we will show a 404. */}
        <Route path="*" element={<h1>404</h1>} />
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}

export default App
