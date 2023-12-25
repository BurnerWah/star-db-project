import type { FC, JSX } from 'react'
import { Route } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux.ts'
import LoginPage from '../../pages/Login'

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

function ProtectedRoute({
  component,
  children,
  ...props
}: Readonly<{
  // I don't know if these types are quite correct
  component?: FC
  children?: JSX.Element
  [key: string]: unknown
}>) {
  const user = useAppSelector((store) => store.user)

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children)

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.id ? (
        // If the user is logged in, show the protected component
        <ProtectedComponent />
      ) : (
        // Otherwise, redirect to the Loginpage
        <LoginPage />
      )}
    </Route>
  )
}

export default ProtectedRoute
