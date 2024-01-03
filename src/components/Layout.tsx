import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import Nav from './Nav/Nav'

export default function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
