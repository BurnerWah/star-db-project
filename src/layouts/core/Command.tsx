import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNavigate, type NavigateOptions, type To } from 'react-router-dom'

export default function Command() {
  const navigate = useNavigate()
  const user = useAppSelector((store) => store.user)
  const dispatch = useAppDispatch()

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
          <CommandItem onSelect={() => goToPage('/list')}>List</CommandItem>
          <CommandItem onSelect={() => goToPage('/about')}>About</CommandItem>
        </CommandGroup>
        {!user.id && (
          <CommandGroup title="Authentication">
            <CommandItem onSelect={() => goToPage('/login')}>Login</CommandItem>
            <CommandItem onSelect={() => goToPage('/registration')}>
              Register
            </CommandItem>
          </CommandGroup>
        )}
        {user.id && (
          <CommandGroup title="User">
            <CommandItem onSelect={() => goToPage('/user')}>
              User Info
            </CommandItem>
            <CommandItem onSelect={() => goToPage('/saved')}>Saved</CommandItem>
            <CommandItem onSelect={() => goToPage('/info')}>
              Info Page
            </CommandItem>
            <CommandItem onSelect={() => dispatch({ type: 'api/auth/logout' })}>
              Logout
            </CommandItem>
          </CommandGroup>
        )}
        {user.administrator && (
          <CommandGroup title="Admin">
            <CommandItem onSelect={() => goToPage('/add')}>
              Add Item
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
