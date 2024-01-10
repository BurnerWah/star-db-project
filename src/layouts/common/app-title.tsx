import { cn } from '@/lib/utils'
import { Orbit } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AppTitle({ className }: Readonly<{ className?: string }>) {
  return (
    <Link to="/home" className={cn('flex items-center space-x-2', className)}>
      <Logo />
      <span className="hidden sm:inline-block">StarForge</span>
    </Link>
  )
}

export function Logo() {
  return <Orbit className="text-purple-500" />
}
