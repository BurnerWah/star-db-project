import { useEffect } from 'react'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import RequireAdmin from './components/RequireAdmin'
import RequireAuth from './components/RequireAuth'
import { TypographyH1 } from './components/typography'
import './global.css'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import AddItem from './pages/AddItem'
import Info from './pages/Info'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Saved from './pages/Saved'
import User from './pages/User'

function App() {
  const dispatch = useAppDispatch()

  const user = useAppSelector((store) => store.user)

  useEffect(() => {
    dispatch({ type: 'user/fetch' })
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
              <User />
            </RequireAuth>
          }
        />
        <Route
          path="info"
          element={
            <RequireAuth>
              <Info />
            </RequireAuth>
          }
        />
        <Route
          path="login"
          element={user.id ? <Navigate to="/user" /> : <Login />}
        />
        <Route
          path="registration"
          element={user.id ? <Navigate to="/user" /> : <Register />}
        />
        <Route
          path="home"
          element={user.id ? <Navigate to="/user" /> : <Landing />}
        />
        <Route path="list" lazy={() => import('./pages/Listing')} />
        <Route
          path="saved"
          element={
            <RequireAuth>
              <Saved />
            </RequireAuth>
          }
        />
        <Route path="details/:id" lazy={() => import('./pages/Details')} />
        <Route
          path="add"
          element={
            <RequireAdmin>
              <AddItem />
            </RequireAdmin>
          }
        />
        {/* If none of the other routes matched, we will show a 404. */}
        <Route path="*" element={<TypographyH1>404</TypographyH1>} />
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}

export default App
