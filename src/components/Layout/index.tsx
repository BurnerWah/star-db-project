import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Nav from './Nav'
// import OldNav from './OldNav'

export default function Layout() {
  return (
    <div>
      {/* <OldNav /> */}
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
