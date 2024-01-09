import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'
import Command from './Command'
import Footer from './Footer'
import Nav from './Nav'

export function Layout() {
  return (
    <div>
      <Nav />
      <body>
        <main className="p-5">
          <Command />
          <Outlet />
        </main>
        <Toaster />
      </body>
      <Footer />
    </div>
  )
}
