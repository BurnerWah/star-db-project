import { cn } from '@/lib/utils'
import { Orbit } from 'lucide-react'
import { memo } from 'react'
import { Link } from 'react-router-dom'

type AppTitleProps = Readonly<{
  className?: string
}>

export const AppTitle = memo(({ className }: AppTitleProps) => (
  <Link to="/home" className={cn('flex items-center space-x-2', className)}>
    <Logo />
    <span className="hidden sm:inline-block">StarForge</span>
  </Link>
))
AppTitle.displayName = 'AppTitle'

export const Logo = memo(() => <Orbit className="text-purple-500" />)
Logo.displayName = 'Logo'
