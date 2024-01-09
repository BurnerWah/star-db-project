import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'
import Command from './Command'
import Footer from './Footer'
import Header from './Header'

export function Layout() {
  return (
    <body className="min-h-screen">
      <Command />
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </body>
  )
}
