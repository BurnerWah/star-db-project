import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'
import Command from './Command'
import Footer from './Footer'
import Header from './Header'

export function Layout() {
  return (
    <div>
      <body>
        <Header />
        <Command />
        <main className="p-5">
          <Outlet />
        </main>
        <Toaster />
        <Footer />
      </body>
    </div>
  )
}
