import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import OldNav from './OldNav'

export default function Layout() {
  return (
    <div>
      <OldNav />
      <Outlet />
      <Footer />
    </div>
  )
}
