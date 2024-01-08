import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Nav from './Nav'

export default function Layout() {
  return (
    <div>
      <Nav />
      <body>
        <main>
          <Outlet />
        </main>
        <Toaster />
      </body>
      <Footer />
    </div>
  )
}
