import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectAdministrator, selectLoggedIn } from '@/redux/selectors'
import {
  BookMarked,
  CircleUser,
  Info,
  LayoutList,
  LogIn,
  LogOut,
  PlusSquare,
  UserPlus,
} from 'lucide-react'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNavigate, type NavigateOptions, type To } from 'react-router-dom'

export default function Command() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const loggedIn = useAppSelector(selectLoggedIn)
  const administrator = useAppSelector(selectAdministrator)

  const [open, setOpen] = useState(false)

  useHotkeys(['meta+j', 'ctrl+j'], (e) => {
    e.preventDefault()
    setOpen(true)
  })

  const goToPage = (to: To, options?: NavigateOptions) => {
    setOpen(false)
    navigate(to, options)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup title="Pages">
          <CommandItem onSelect={() => goToPage('/home')}>
            <LayoutList className="mr-2 h-4 w-4" />
            List Items
          </CommandItem>
          <CommandItem onSelect={() => goToPage('/about')}>
            <Info className="mr-2 h-4 w-4" />
            About
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        {loggedIn ?
          <CommandGroup title="User">
            <CommandItem onSelect={() => goToPage('/user')}>
              <CircleUser className="mr-2 h-4 w-4" />
              User Info
            </CommandItem>
            <CommandItem onSelect={() => goToPage('/saved')}>
              <BookMarked className="mr-2 h-4 w-4" /> Saved
            </CommandItem>
            {/* <CommandItem onSelect={() => goToPage('/info')}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Info Page
            </CommandItem> */}
            <CommandItem
              onSelect={() => {
                dispatch({ type: 'api/auth/logout' })
                setOpen(false)
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </CommandItem>
          </CommandGroup>
        : <CommandGroup title="Authentication">
            <CommandItem onSelect={() => goToPage('/login')}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </CommandItem>
            <CommandItem onSelect={() => goToPage('/registration')}>
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </CommandItem>
          </CommandGroup>
        }
        <CommandSeparator />
        {administrator && (
          <CommandGroup title="Admin">
            <CommandItem onSelect={() => goToPage('/add')}>
              <PlusSquare className="mr-2 h-4 w-4" />
              Add Item
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
