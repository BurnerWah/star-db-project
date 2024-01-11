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
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { AppTitle } from '../common/app-title'

type LinkInfo = Omit<ComponentProps<typeof StyledNavLink>, 'to'> & {
  hide?: boolean
  to: string
}

export default function Nav({
  className,
}: Readonly<HTMLAttributes<HTMLElement>>) {
  const dispatch = useAppDispatch()

  const loggedIn = useAppSelector((store) => Boolean(store.user.id))
  const isAdmin = useAppSelector((store) => Boolean(store.user.administrator))

  // This lets me define the nav a bit faster
  const links: LinkInfo[] = [
    { to: '/list', children: 'List Items' },
    { to: '/about', children: 'About' },
    { to: '/login', children: 'Login', hide: loggedIn },
    { to: '/registration', children: 'Register', hide: loggedIn },
    { to: '/user', children: 'User Info', hide: !loggedIn },
    { to: '/info', children: 'Info Page', hide: !loggedIn },
    { to: '/saved', children: 'Saved', hide: !loggedIn },
    { to: '/add', children: 'Add Item', hide: !isAdmin },
  ]

  return (
    <div className={cn('mr-4 hidden md:flex', className)}>
      <AppTitle className="mr-6 font-bold" />
      <nav>
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            {links.map(
              ({ hide, ...props }) =>
                hide || (
                  <NavigationMenuItem key={props.to}>
                    <StyledNavLink {...props} />
                  </NavigationMenuItem>
                ),
            )}
            {loggedIn && (
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
