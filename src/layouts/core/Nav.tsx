import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import {
  forwardRef,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react'
import { NavLink, type NavLinkProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { AppTitle } from '../common/app-title'

export default function Nav({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const user = useAppSelector((store) => store.user)
  const dispatch = useAppDispatch()

  // This lets me define the nav a bit faster
  const links: ComponentProps<typeof ConditionalNavLink>[] = [
    { to: '/list', children: 'List Items' },
    { to: '/about', children: 'About' },
    { to: '/login', children: 'Login', predicate: () => !user.id },
    { to: '/registration', children: 'Register', predicate: () => !user.id },
    { to: '/user', children: 'User Info', predicate: () => Boolean(user.id) },
    { to: '/info', children: 'Info Page', predicate: () => Boolean(user.id) },
    { to: '/saved', children: 'Saved', predicate: () => Boolean(user.id) },
    { to: '/add', children: 'Add Item', predicate: () => user.administrator },
  ]

  return (
    <div className={cn('mr-4 hidden md:flex', className)}>
      <AppTitle className="mr-6 font-bold" />
      <nav>
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            {links.map((props) => (
              <ConditionalNavLink key={props.to} {...props} />
            ))}
            {user.id && (
              <NavigationMenuItem>
                <button
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  onClick={() => dispatch({ type: 'api/auth/logout' })}
                >
                  Log Out
                </button>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  )
}

const StyledNavLink = forwardRef<
  ElementRef<typeof NavLink>,
  ComponentPropsWithoutRef<typeof NavLink>
>(({ className, ...props }, ref) => {
  return (
    <NavLink
      ref={ref}
      className={({ isActive }) =>
        cn(
          'transition-colors hover:text-foreground/80',
          isActive ? 'text-foreground' : 'text-foreground/60',
          className,
        )
      }
      {...props}
    />
  )
})
StyledNavLink.displayName = 'Nav.StyledNavLink'

function ConditionalNavLink({
  predicate = () => true,
  ...props
}: { predicate?: () => boolean; to: string } & Omit<NavLinkProps, 'to'>) {
  return (
    predicate() && (
      <NavigationMenuItem>
        <StyledNavLink {...props} />
      </NavigationMenuItem>
    )
  )
}
