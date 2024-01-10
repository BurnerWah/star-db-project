import 'katex/dist/katex.min.css'
import { useEffect } from 'react'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { TypographyH1 } from './components/typography'
import './global.css'
import { useAppDispatch } from './hooks/redux'
import { Layout } from './layouts/core'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // We do a dispatch here, but checking for authentication is handled
    // by the components from ./components/auth.tsx, which are used in many
    // component functions for pages.
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
        <Route path="user" lazy={() => import('./pages/User')} />
        <Route path="info" lazy={() => import('./pages/Info')} />
        <Route path="login" lazy={() => import('./pages/Login')} />
        <Route path="registration" lazy={() => import('./pages/Register')} />
        <Route path="home" lazy={() => import('./pages/Landing')} />
        <Route path="list" lazy={() => import('./pages/Listing')} />
        <Route path="saved" lazy={() => import('./pages/Saved')} />
        <Route path="details/:id" lazy={() => import('./pages/Details')} />
        <Route path="add" lazy={() => import('./pages/AddItem')} />
        {/* If none of the other routes matched, we will show a 404. */}
        <Route path="*" element={<TypographyH1>404</TypographyH1>} />
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}

export default App
