import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import LogOutButton from '../LogOutButton'
import { TypographyH2 } from '../typography'

interface LinkInfo {
  title: string
  href: string
  predicate?: () => boolean
}

export default function Nav({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const user = useAppSelector((store) => store.user)

  // This lets me define the nav a bit faster
  const links: LinkInfo[] = [
    { title: 'Login / Register', href: '/login', predicate: () => !user.id },
    { title: 'Home', href: '/user', predicate: () => Boolean(user.id) },
    { title: 'Info Page', href: '/info', predicate: () => Boolean(user.id) },
    { title: 'Saved Items', href: '/saved', predicate: () => Boolean(user.id) },
    { title: 'Add Item', href: '/add', predicate: () => user.administrator },
    { title: 'About', href: '/about' },
    { title: 'List Items', href: '/list' },
  ]

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <NavLink to="/home">
        <TypographyH2>StarForge</TypographyH2>
      </NavLink>
      {links.map((link) => (
        <LinkFromInfo info={link} key={link.href} />
      ))}
      {/* I'd like to get rid of the LogOutButton component here eventually */}
      {user.id && <LogOutButton />}
    </nav>
  )
}

function LinkFromInfo({ info }: { info: LinkInfo }) {
  return info.predicate ? (
    info.predicate() && <NavLink to={info.href}>{info.title}</NavLink>
  ) : (
    <NavLink to={info.href}>{info.title}</NavLink>
  )
}
