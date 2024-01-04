import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Nav from './Nav'

export default function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
