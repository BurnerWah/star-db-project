import { Toaster } from '@/components/ui/toaster'
import { useAppSelector } from '@/hooks/redux'
import { Outlet } from 'react-router-dom'
import Command from './Command'
import Footer from './Footer'
import Header from './Header'

export function Layout() {
  const showHeader = useAppSelector((state) => state.ui.showHeader)
  const showFooter = useAppSelector((state) => state.ui.showFooter)

  return (
    <body className="min-h-screen">
      <Command />
      <div className="relative flex min-h-screen flex-col">
        {showHeader && <Header />}
        <main className="flex-1">
          <Outlet />
        </main>
        {showFooter && <Footer />}
      </div>
      <Toaster />
    </body>
  )
}
